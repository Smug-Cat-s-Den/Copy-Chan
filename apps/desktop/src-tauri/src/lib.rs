pub mod copy;
pub mod core;

use crate::core::config::setup_config;
use crate::window_pos::window_pos;
use crate::{
    copy::{
        cblisten::{cblisten, copy_and_ignore},
        copy::{del_entry, delete_all, get_history, pin_history, CopyRecord},
    },
    core::{load_and_save::load_history, window_pos},
};
use std::collections::HashSet;
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

/*
 * In memory Clipbord data
 */
static COPY_HISTROY: OnceLock<Mutex<Vec<CopyRecord>>> = OnceLock::new();
static COPY_HASH: OnceLock<Mutex<HashSet<String>>> = OnceLock::new();

pub fn get_copy_hash() -> &'static Mutex<HashSet<String>> {
    COPY_HASH.get_or_init(|| Mutex::new(HashSet::new()))
}
/*
 * Max entries
 */
static MAX_ENTRIES: OnceLock<Mutex<usize>> = OnceLock::new();

fn get_max_entries_mutex() -> MutexGuard<'static, usize> {
    let mutex = MAX_ENTRIES.get_or_init(|| Mutex::new(10));
    return mutex.lock().unwrap();
}

#[tauri::command]
fn update_max_entries_on_memory(new_value: usize) {
    let mut max_entries_mutex = get_max_entries_mutex();
    *max_entries_mutex = new_value;
}

/*
 * Data Directory initialization
 */
static COPY_PATH: OnceCell<PathBuf> = OnceCell::new();
static IMAGE_COPY_PATH: OnceCell<PathBuf> = OnceCell::new();

fn set_global_data_path(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let mut path = app.path().app_config_dir()?;
    path.push("store");
    std::fs::create_dir_all(&path)?;
    path.push("data.bin");
    COPY_PATH.set(path.clone()).expect("Copy path already set");
    path.pop();
    path.push("Imgs");
    std::fs::create_dir_all(&path)?;
    IMAGE_COPY_PATH
        .set(path.clone())
        .expect("Image path already set");
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
    // println!("window will show"); //debug
    window_pos(&app, false);
}

#[tauri::command]
fn show_window_using_shortcut(app: tauri::AppHandle) {
    window_pos(&app, true);
    // println!("window will show"); //debug
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("GDK_BACKEND", "x11");
    std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .level(tauri_plugin_log::log::LevelFilter::Info)
                .build(),
        )
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
        .setup(|app| {
            set_global_data_path(app).map_err(|e| e)?;
            load_history().map_err(|e| e.to_string())?;
            listen_to_clipbord(app);
            setup_config(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            del_entry,
            pin_history,
            get_history,
            close_programe,
            show_window,
            show_window_using_shortcut,
            copy_and_ignore,
            delete_all,
            update_max_entries_on_memory
        ])
        .build(tauri::generate_context!())
        .expect("error while building app")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::Exit => {}
            _ => {}
        })
}
