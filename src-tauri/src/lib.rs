pub mod copy_logic;
pub mod core;

// imported functions from copy_logic
use crate::{
    copy_logic::{
        cblisten::{cblisten, copy_and_ignore},
        copy::{
            copy_history_add, del_entry, delete_all, get_enties_limit_by_user, get_history,
            pin_history, CopyRecord,
        },
    },
    core::{load_and_save::load_history, setup::app_setup},
};
// modules
use mouse_position::mouse_position::Mouse;
use once_cell::sync::OnceCell;
use std::{
    path::PathBuf,
    sync::{atomic::AtomicBool, Mutex, OnceLock},
    thread,
};
use tauri::{AppHandle, Manager, PhysicalPosition};

pub struct ClipBoardState {
    pub ignore_next: AtomicBool,
}

//global states
static COPY_PATH: OnceCell<PathBuf> = OnceCell::new();
static COPY_HISTROY: OnceLock<Mutex<Vec<CopyRecord>>> = OnceLock::new();

// init a global Vec<CopyRecords> using OnceCell
fn set_global_data_path(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let mut path = app.path().app_config_dir()?;
    path.push("copyhistory");
    std::fs::create_dir_all(&path)?;
    path.push("copy_data.json");

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
fn hide_window(app: AppHandle) {
    // println!("hiding the window");
    if let Some(main_window) = app.get_webview_window("main") {
        main_window.hide().unwrap();
    } else {
        println!("No window labeled 'main' found");
    }
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

// Window position calculation
fn window_pos(app: AppHandle, is_shortcut: bool) {
    if let Some(main_window) = app.get_webview_window("main") {
        let pos = Mouse::get_mouse_position();
        match pos {
            Mouse::Position { x, y } => {
                if is_shortcut {
                    let _ = main_window.set_position(PhysicalPosition::new(x, y));
                } else {
                    let monitors = main_window.available_monitors().unwrap_or_default();
                    let target_monitor = monitors.into_iter().find(|m| {
                        let m_pos = m.position();
                        let m_size = m.size();
                        x >= m_pos.x
                            && x <= (m_pos.x + m_size.width as i32)
                            && y >= m_pos.y
                            && y <= (m_pos.y + m_size.height as i32)
                    });

                    if let Some(monitor) = target_monitor {
                        let m_pos = monitor.position();
                        let m_size = monitor.size();
                        let new_x = m_pos.x + (m_size.width as f64 * 0.72) as i32;
                        let _ =
                            main_window.set_position(PhysicalPosition::new(new_x, m_pos.y + 10));
                    }
                }
            }
            _ => eprintln!("Could not get mouse position"),
        }

        let _ = main_window.set_visible_on_all_workspaces(true);
        let _ = main_window.show();
        let _ = main_window.set_focus();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::env::set_var("GDK_BACKEND", "x11");
    tauri::Builder::default()
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
            listen_to_clipbord(app_handle);
            app_setup(app_handle);
            // here decrypt the encrypted data from drive and store to global Vec<CopyRecords>
            load_history();
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
            hide_window,
            copy_and_ignore,
            delete_all
        ])
        .build(tauri::generate_context!())
        .expect("error while building app")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::Exit => {}
            _ => {}
        })
    // .expect("error while running tauri application");
}
