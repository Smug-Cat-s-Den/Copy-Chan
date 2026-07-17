// use aes_gcm::{
//     aead::{Aead, KeyInit},
//     Aes256Gcm, Nonce,
// };
// use keyring::Entry;
// use once_cell::sync::Lazy;
// use rand::{thread_rng, RngCore};

// static MASTER_KEY: Lazy<Vec<u8>> =
//     Lazy::new(|| get_or_create_key().expect("Critical: Could not initialize encryption key"));

// fn get_or_create_key() -> Result<Vec<u8>, String> {
//     let entry = Entry::new("com.clipboard.app", "master_storage_key")
//         .map_err(|e| format!("Keyring Entry Error: {}", e))?;

//     match entry.get_password() {
//         Ok(hex_string) => {
//             let key = hex::decode(&hex_string).map_err(|e| e.to_string())?;
//             // println!("CRYPTO DEBUG: Key Loaded! First 4 bytes: {:?}", &key[..4]);
//             Ok(key)
//         }
//         Err(_) => {
//             println!("CRYPTO DEBUG: Key not found in OS. Generating now...");
//             let mut new_key = [0u8; 32];
//             thread_rng().fill_bytes(&mut new_key);

//             let hex_key = hex::encode(new_key);
//             entry
//                 .set_password(&hex_key)
//                 .map_err(|e| format!("Keyring Save Error: {}", e))?;

//             Ok(new_key.to_vec())
//         }
//     }
// }

// pub fn encrypt_data(data: &[u8]) -> Result<Vec<u8>, String> {
//     let cipher =
//         Aes256Gcm::new_from_slice(&MASTER_KEY).map_err(|e| format!("Cipher init error: {}", e))?;

//     let mut nonce_bytes = [0u8; 12];
//     thread_rng().fill_bytes(&mut nonce_bytes);
//     let nonce = Nonce::from_slice(&nonce_bytes);

//     let ciphertext = cipher
//         .encrypt(nonce, data)
//         .map_err(|e| format!("Encryption error: {}", e))?;

//     let mut encrypted_packet = nonce_bytes.to_vec();
//     encrypted_packet.extend_from_slice(&ciphertext);

//     Ok(encrypted_packet)
// }

// pub fn decrypt_data(encrypted_data: &[u8]) -> Result<Vec<u8>, String> {
//     if encrypted_data.len() < 12 {
//         return Err("Encrypted data is too short".into());
//     }

//     let cipher =
//         Aes256Gcm::new_from_slice(&MASTER_KEY).map_err(|e| format!("Cipher init error: {}", e))?;

//     let (nonce_bytes, ciphertext) = encrypted_data.split_at(12);
//     let nonce = Nonce::from_slice(nonce_bytes);

//     let plaintext = cipher
//         .decrypt(nonce, ciphertext)
//         .map_err(|e| format!("Decryption error: {}", e))?;

//     Ok(plaintext)
// }
