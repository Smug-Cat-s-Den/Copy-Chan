use crate::core::load_and_save::save_history;
use crate::COPY_HISTROY;
// use crate::copy_logic::encrypt::{decrypt_data, encrypt_data};
use serde::{Deserialize, Serialize};
use serde_json::Number;
// use std::fs::{self, File};
// use std::io::Write;
use std::sync::{Mutex, MutexGuard};
use uuid::Uuid;
#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct CopyRecord {
    id: Uuid,
    item: String,
    pinned: bool,
}

const MAX_ENTRIES: usize = 10;

fn get_global_history_mutex() -> MutexGuard<'static, Vec<CopyRecord>> {
    COPY_HISTROY
        .get_or_init(|| Mutex::new(Vec::new()))
        .lock()
        .unwrap()
}

// fetch the global Vec<CopyRecords> state for storing clipbord data
/*
fn write_file(json: String) {
    // let encrypted_bytes = encrypt_data(json.as_bytes()).expect("Encryption failed");
    let mut file = File::create(file_data_path()).expect("Failed to create file");
    file.write_all(json.as_bytes())
        .expect("Failed to write to file");
}
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
    if history.len() > MAX_ENTRIES {
        history.truncate(MAX_ENTRIES);
    }
    save_history();
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

//delete all
#[tauri::command]
pub fn delete_all() -> Result<(), String> {
    let mut history = get_global_history_mutex();
    // clear the Vec<CopyRecord> global state
    history.clear();
    Ok(())
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
    Ok(())
}
