pub mod copy;
pub mod core;

use crate::core::config::setup_config;
use crate::window_pos::window_pos;
use crate::{
    copy::{
        cblisten::{cblisten, copy_and_ignore},
        copy::{
            copy_history_add, del_entry, delete_all, get_enties_limit_by_user, get_history,
            pin_history, CopyRecord,
        },
    },
    core::{load_and_save::load_history, window_pos},
};
use std::sync::MutexGuard;

use once_cell::sync::OnceCell;
use std::{
    path::PathBuf,
    sync::{atomic::AtomicBool, Mutex, OnceLock},
    thread,
};
use tauri::{AppHandle, Manager};

pub struct ClipBoardState {
    pub ignore_next: AtomicBool,
}

//global states
static COPY_PATH: OnceCell<PathBuf> = OnceCell::new();
static COPY_HISTROY: OnceLock<Mutex<Vec<CopyRecord>>> = OnceLock::new();
static MAX_ENTRIES: OnceLock<Mutex<usize>> = OnceLock::new();

fn get_max_entries_mutex() -> MutexGuard<'static, usize> {
    let mutex = MAX_ENTRIES.get_or_init(|| Mutex::new(10));
    return mutex.lock().unwrap();
}

// init a global Vec<CopyRecords> using OnceCell
fn set_global_data_path(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let mut path = app.path().app_config_dir()?;
    path.push("copyhistory");
    std::fs::create_dir_all(&path)?;
    path.push("data.bin");
    // println!("{}", path.display());
    COPY_PATH.set(path).expect("Path already set");
    Ok(())
}

//listens to the clipbord
fn listen_to_clipbord(app: &mut tauri::App) {
    let handle = app.handle().clone();
    thread::spawn(move || {
        cblisten(handle);
    });
}

#[tauri::command]
fn close_programe(app_handle: AppHandle) {
    println!("closing programe");
    app_handle.exit(0);
}

#[tauri::command]
fn show_window(app: tauri::AppHandle) {
    // println!("window will show");
    window_pos(app, false);
}

#[tauri::command]
fn show_window_using_shortcut(app: tauri::AppHandle) {
    window_pos(app, true);
    println!("window will show");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("GDK_BACKEND", "x11");
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .manage(ClipBoardState {
            ignore_next: AtomicBool::new(false),
        })
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }))
        .plugin(tauri_plugin_autostart::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_prevent_default::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app_handle| {
            match set_global_data_path(app_handle) {
                Ok(()) => {}
                Err(e) => {
                    eprintln!("error setting up global path : {}", e)
                }
            };
            load_history().map_err(|e| e.to_string())?;
            listen_to_clipbord(app_handle);
            setup_config(app_handle)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_enties_limit_by_user,
            copy_history_add,
            del_entry,
            pin_history,
            get_history,
            close_programe,
            show_window,
            show_window_using_shortcut,
            copy_and_ignore,
            delete_all
        ])
        .build(tauri::generate_context!())
        .expect("error while building app")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::Exit => {}
            _ => {}
        })
}
