use crate::core::load_and_save::load_history;

pub fn app_setup(_app: &mut tauri::App) {
    load_history();
}
