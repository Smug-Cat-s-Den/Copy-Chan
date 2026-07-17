use crate::COPY_PATH;
// use crate::copy_logic::encrypt::{decrypt_data, encrypt_data};
use serde::{Deserialize, Serialize};
use serde_json::Number;
use std::fs::{self, File};
use std::io::Write;
use std::path::PathBuf;
use uuid::Uuid;
#[derive(Deserialize, Serialize, Debug)]

pub struct CopyBord {
    id: Uuid,
    item: String,
    pinned: bool,
}

const MAX_ENTRIES: usize = 10;

fn file_data_path() -> &'static PathBuf {
    COPY_PATH.get().expect("COPY_PATH not initialized")
}

fn write_file(json: String) {
    // let encrypted_bytes = encrypt_data(json.as_bytes()).expect("Encryption failed");
    let mut file = File::create(file_data_path()).expect("Failed to create file");
    file.write_all(json.as_bytes())
        .expect("Failed to write to file");
}

#[tauri::command]
pub fn get_enties_limit_by_user(limit: Number) {
    println!("limit set to{}", limit);
}

#[tauri::command]
pub fn copy_history_add(content: String) -> Result<(), String> {
    let new_item = CopyBord {
        id: Uuid::new_v4(),
        item: content,
        pinned: false,
    };

    if let Some(parent) = std::path::Path::new(file_data_path()).parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create directory: {}", e))?;
    }

    let mut history: Vec<CopyBord> = get_history().unwrap_or_else(|_| Vec::new());

    history.insert(0, new_item);
    if history.len() > MAX_ENTRIES {
        history.truncate(MAX_ENTRIES);
    }
    let json_string = serde_json::to_string_pretty(&history)
        .map_err(|e| format!("Failed to serialize history: {}", e))?;
    write_file(json_string);
    Ok(())
}

//getting records
#[tauri::command]
pub fn get_history() -> Result<Vec<CopyBord>, String> {
    let history_data = match fs::read(file_data_path()) {
        Ok(data) => data,
        Err(e) => {
            if e.kind() == std::io::ErrorKind::NotFound {
                return Ok(vec![]);
            }
            return Err(format!("File read error: {}", e));
        }
    };

    // if encrypted_data.is_empty() {
    //     return Ok(vec![]);
    // }

    // let decrypted_bytes = decrypt_data(&encrypted_data)
    //     .map_err(|e| format!("Decryption failed: {}. (Check if your key has changed)", e))?;

    let history: Vec<CopyBord> =
        serde_json::from_slice(&history_data).map_err(|e| format!("JSON parsing failed: {}", e))?;
    Ok(history)
}

#[tauri::command]
pub fn del_entry(id: String) -> Result<(), String> {
    let target_uuid =
        Uuid::parse_str(&id).map_err(|e| format!("Invalid uuid for deletion: {}", e))?;
    let mut history = get_history().unwrap_or_else(|_| Vec::new());

    let initial_len = history.len();

    history.retain(|entry| entry.id != target_uuid);

    if history.len() == initial_len {
        println!("Entry with id: {} not found.", id);
        return Ok(());
    }

    println!("Entry with id: {} deleted.", id);
    let json_string = serde_json::to_string_pretty(&history)
        .map_err(|e| format!("Failed to serialize history: {}", e))?;

    write_file(json_string);
    Ok(())
}

//delete all
#[tauri::command]
pub fn delete_all() -> Result<(), String> {
    let mut history = get_history()?;
    history.clear();
    let json_file = serde_json::to_string_pretty(&history).map_err(|e| e.to_string())?;
    write_file(json_file);
    Ok(())
}

//pin logic
#[tauri::command]
pub fn pin_history(id: Uuid) -> Result<(), String> {
    let mut history = get_history()?;
    for rec in history.iter_mut() {
        if rec.id == id {
            if rec.pinned == true {
                rec.pinned = false;
            } else {
                rec.pinned = true;
            };
        }
    }
    let json_file = serde_json::to_string_pretty(&history).map_err(|e| e.to_string())?;
    write_file(json_file);
    Ok(())
}
