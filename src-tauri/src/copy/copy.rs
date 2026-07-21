use crate::{core::load_and_save::save_history};
use crate::{get_max_entries_mutex, COPY_HISTROY};
use serde::{Deserialize, Serialize};
use serde_json::Number;
use std::sync::{Mutex, MutexGuard};
use uuid::Uuid;

// Constants
// const MAX_ENTRIES: usize = 10;

// Stucts
#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct CopyRecord {
    id: Uuid,
    item: String,
    pinned: bool,
}

// Helpers
pub fn get_global_history_mutex() -> MutexGuard<'static, Vec<CopyRecord>> {
    COPY_HISTROY
        .get_or_init(|| Mutex::new(Vec::new()))
        .lock()
        .unwrap()
}

/*
 Main command functions
 functions that must be invoked from the Frontend client
*/

#[tauri::command]
pub fn get_enties_limit_by_user(limit: Number) {
    println!("limit set to{}", limit);
}

//Create
#[tauri::command]
pub fn copy_history_add(content: String) -> Result<(), String> {
    let new_item: CopyRecord = CopyRecord {
        id: Uuid::new_v4(),
        item: content,
        pinned: false,
    };

    let mut history = get_global_history_mutex();
    history.insert(0, new_item);
    if history.len() > *get_max_entries_mutex() {
        history.truncate(*get_max_entries_mutex());
    }
    save_history(&history).map_err(|e| format!("Failded to Save data {}", e))?;
    Ok(())
}

//Read
#[tauri::command]
pub fn get_history() -> Result<Vec<CopyRecord>, String> {
    let history_mutex = COPY_HISTROY.get();
    match history_mutex {
        Some(history_mutex) => {
            let history = history_mutex.lock().map_err(|e| e.to_string())?;
            Ok(history.clone())
        }
        None => Ok(Vec::new()),
    }
}

//Pin
#[tauri::command]
pub fn pin_history(id: Uuid) -> Result<(), String> {
    let mut history = get_global_history_mutex();
    for rec in history.iter_mut() {
        if rec.id == id {
            if rec.pinned == true {
                rec.pinned = false;
            } else {
                rec.pinned = true;
            };
        }
    }
    save_history(&history).map_err(|e| format!("Failded to Save data {}", e))?;
    Ok(())
}

//Delete
#[tauri::command]
pub fn del_entry(id: String) -> Result<(), String> {
    let target_uuid =
        Uuid::parse_str(&id).map_err(|e| format!("Invalid uuid for deletion: {}", e))?;

    let mut history = get_global_history_mutex();
    let target_index = history.iter().position(|entry| entry.id == target_uuid);
    match target_index {
        Some(target_index) => {
            let removed_item = history.remove(target_index);
            println!("Entry with id: {} deleted.", removed_item.id);
            Ok(())
        }
        None => Err("Element not found".to_string()),
    }
}

//Delete all
#[tauri::command]
pub fn delete_all() -> Result<(), String> {
    let mut history = get_global_history_mutex();
    history.clear();
    Ok(())
}
