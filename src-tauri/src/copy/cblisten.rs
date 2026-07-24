use clipboard_listener::listen_clipboard;
use std::sync::atomic::Ordering;
use tauri::async_runtime;
use tauri::Emitter;
use tauri::Manager;
use tauri_plugin_clipboard_manager::ClipboardExt;

use crate::copy::copy::copy_history_add;
use crate::ClipBoardState;

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

    Ok(())
}

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
