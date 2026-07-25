use clipboard_listener::listen_clipboard;
use std::sync::atomic::Ordering;
use tauri::async_runtime;
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
    println!("Called simulate paste");
    // std::thread::sleep(std::time::Duration::from_millis(100)); //sleep the thread to allow the window to refocus to the previous one
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
            match app_handle_clone.clipboard().read_text() {
                Ok(text) => {
                    if let Err(e) = app_handle_clone.emit("clipboard-changed", text.clone()) {
                        eprintln!("Emit failed: {:?}", e);
                    }
                    let _ = copy_history_add(text);
                }
                Err(e) => eprintln!("Failed to read clipboard: {:?}", e),
            }
        });
    };

    if let Err(e) = listen_clipboard(Box::new(callback)) {
        eprintln!("Clipboard listener error: {:?}", e);
    }
}
