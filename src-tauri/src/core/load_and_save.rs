use crate::COPY_PATH;
use std::path::PathBuf;

fn file_data_path() -> &'static PathBuf {
    &COPY_PATH.get().expect("COPY_PATH not initialized")
}

pub fn load_history() {
    println!("Loading data from json")
}
pub fn save_history() {
    let path: &PathBuf = file_data_path();
    println!("saving data to json\n save path dict: {}", path.display());
}
