use base64::engine::general_purpose;
use base64::Engine;
use clipboard_listener::listen_clipboard;
use image::RgbImage;
use std::io::Cursor;
use std::sync::atomic::Ordering;
use tauri::async_runtime;
use tauri::image::Image;
use tauri::Emitter;
use tauri::Manager;
use tauri_plugin_clipboard_manager::ClipboardExt;

use crate::copy::copy::copy_history_add;
use crate::ClipBoardState;
use enigo::{
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Settings,
};

/*

Simulate paste depending on the device
*/
fn simulate_paste(is_mac: bool) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| e.to_string())?;
    if is_mac {
        enigo.key(Key::Meta, Press).map_err(|e| e.to_string())?;
        enigo
            .key(Key::Unicode('v'), Click)
            .map_err(|e| e.to_string())?;
        enigo.key(Key::Meta, Release).map_err(|e| e.to_string())?;
    } else {
        enigo.key(Key::Control, Press).map_err(|e| e.to_string())?;
        enigo
            .key(Key::Unicode('v'), Click)
            .map_err(|e| e.to_string())?;
        enigo
            .key(Key::Control, Release)
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

/*
Parse Clipboard image
*/
fn parse_into_base64_image(img: Image<'_>) -> Option<String> {
    let image_width = img.width();
    let image_height = img.height();
    let image_bytes = img.rgba().to_owned();

    if let Some(image_bytes) = RgbImage::from_raw(image_width, image_height, image_bytes) {
        let mut buffer_container = Cursor::new(Vec::<u8>::new());
        println!("Image size: {}mb", image_bytes.len() as f64 / 1_048_576.0); // for debuging
        let converted_png = image_bytes
            .write_to(&mut buffer_container, image::ImageFormat::Png)
            .is_ok(); // convert the bytes into a compressed png

        if converted_png {
            let base64_img_string = general_purpose::STANDARD.encode(buffer_container.into_inner());
            let final_img_data_string = format!("data:image/png;base64,{}", base64_img_string);
            return Some(final_img_data_string);
        }
    }
    None
}

/*
Ignore the next write if the global ignore_next state is true
*/
#[tauri::command]
pub fn copy_and_ignore(
    item: String,
    state: tauri::State<'_, ClipBoardState>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    state.ignore_next.store(true, Ordering::SeqCst); //updates flag to ignore Clipbord update

    app.clipboard()
        .write_text(item)
        .map_err(|e| e.to_string())?;

    //hide the window as soon as the write is done
    if let Some(window) = app.get_webview_window("main") {
        window.hide().map_err(|e| e.to_string())?;
    }

    #[cfg(target_os = "macos")]
    {
        simulate_paste(true)?;
    }

    #[cfg(not(target_os = "macos"))]
    {
        simulate_paste(false)?;
    }

    Ok(())
}

/*
 * Emit signal for the UI to render the latest data
 */
fn emit_clipboard_changed(app_handle: &tauri::AppHandle, data: String, is_image: bool) {
    let _ = app_handle
        .emit("clipboard-changed", &data)
        .map_err(|e| eprintln!("Failed emit clipboard-changed {}", e));
    let _ = copy_history_add(data, is_image)
        .map_err(|e| eprintln!("Failed to add history, Error : {}", e));
}

/*
    Listen the OS clipboard for any change
*/
pub fn cblisten(app_handle: tauri::AppHandle) {
    let callback = move || {
        let app_handle_clone = app_handle.clone();
        async_runtime::spawn(async move {
            //gatekeep when copied from the app else add them
            let state = app_handle_clone.state::<ClipBoardState>();
            if state.ignore_next.load(Ordering::SeqCst) {
                state.ignore_next.store(false, Ordering::SeqCst);
                return;
            }
            let clipboard = app_handle_clone.clipboard();
            // Image data
            match clipboard.read_image() {
                Ok(img) => {
                    if let Some(final_image_string) = parse_into_base64_image(img) {
                        // final_image save to bin
                        println!("Final Image string: {}", final_image_string);
                        // if !final_image_string.trim().is_empty() {
                        //     emit_clipboard_changed(&app_handle_clone, final_image_string, true);
                        // }
                    }
                }
                Err(e) => eprintln!("Failed to read image from clipoard {}", e),
            }
            // Text data
            match clipboard.read_text() {
                Ok(text) => {
                    if !text.trim().is_empty() {
                        emit_clipboard_changed(&app_handle_clone, text, false);
                    }
                }
                Err(e) => eprintln!("Failed to read clipboard: {:?}", e),
            }
        });
    };

    if let Err(e) = listen_clipboard(Box::new(callback)) {
        eprintln!("Clipboard listener error: {:?}", e);
    }
}
