use crate::get_max_entries_mutex;
use tauri::Runtime;
use tauri_plugin_store::StoreExt;

pub fn setup_config(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let store = app.store("config.json")?;
    setup_max_entires(&store);
    Ok(())
}

fn setup_max_entires<R: Runtime>(_store: &tauri_plugin_store::Store<R>) {
    // let store_entries = 20;
    let store_entries = _store
        .get("MaxEntries")
        .and_then(|v| v.as_u64())
        .map(|v| v as usize)
        .unwrap_or(20);
    let mut entries_ = get_max_entries_mutex();
    *entries_ = store_entries;
}
