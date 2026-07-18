use crate::{
    copy::copy::{get_global_history_mutex, CopyRecord},
    core::encryption::{decrypt_data, encrypt_data},
    COPY_PATH,
};
use std::{
    fs::{self, File},
    io::{BufWriter, Result, Write},
    path::PathBuf,
};
/*
 * helpers
 */
fn file_data_path() -> &'static PathBuf {
    &COPY_PATH.get().expect("COPY_PATH not initialized")
}

/*
 * Decrypt & Load data to memory
 */
pub fn load_history() -> Result<()> {
    println!("Loading data from json");
    let bin_data = fs::read(file_data_path());
    match bin_data {
        Ok(bin_data) => {
            let decrypted_string = decrypt_data(&bin_data)
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))?;
            let original_record: Vec<CopyRecord> = serde_json::from_str(&decrypted_string)?;
            let mut histroy = get_global_history_mutex();
            *histroy = original_record;
            Ok(())
        }
        Err(_) => {
            println!("File dosn't exist, new file created");
            let path: &PathBuf = file_data_path();
            let file = File::create(path)?;
            let mut writer = BufWriter::new(file);
            writer.write_all(&vec![0])?;
            let mut histroy = get_global_history_mutex();
            let reset: Vec<CopyRecord> = Vec::new();
            *histroy = reset;
            Ok(())
        }
    }
}

/*
 * Save data & Write to JSON file
 */
pub fn save_history(history: &Vec<CopyRecord>) -> Result<()> {
    let path: &PathBuf = file_data_path();
    let file = File::create(path)?;
    let mut writer = BufWriter::new(file);
    //serialize the save data into human readable string using srede_json
    let serialized_history_data: String = serde_json::to_string_pretty(&history)?;
    let encrypted_data = encrypt_data(serialized_history_data)
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))?;
    writer.write_all(&encrypted_data)?;
    Ok(())
}
