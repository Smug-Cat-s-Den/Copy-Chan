// docs for aes_gcm : https://docs.rs/aes-gcm/latest/aes_gcm/
use aes_gcm::{aead::Aead, Aes256Gcm, Key, KeyInit, Nonce};
use keyring::Entry;
use once_cell::sync::Lazy;
use rand::RngExt;

// constants
const SERVICE: &str = "com.clipboard.app";
const USERNAME: &str = "master_storage_key";

//static global
static SYSTEM_ENCRYPTION_KEY: Lazy<Vec<u8>> =
    Lazy::new(|| get_key_from_system_vault().expect("Could not initiate Encryption key"));

/*
 * Method to initialize the key or fetch it.
 * If the key already exists then simply return it
 */
fn get_key_from_system_vault() -> Result<Vec<u8>, String> {
    let entry = Entry::new(SERVICE, USERNAME).map_err(|e| e.to_string())?;
    let encoded_key = entry.get_password();
    match encoded_key {
        Ok(encoded_key) => {
            let key = hex::decode(&encoded_key).map_err(|e| e.to_string())?;
            Ok(key)
        }
        Err(_) => {
            println!("No key found, Creating new key");
            let mut new_encryption_key = [0u8; 32];
            rand::rng().fill(&mut new_encryption_key);
            let encoded_key = hex::encode(&new_encryption_key);
            entry
                .set_password(&encoded_key)
                .map_err(|e| e.to_string())?;
            Ok(new_encryption_key.to_vec())
        }
    }
}

/*
 * Method to encrypt the provided serialized data string using aes_gcm
 */
pub fn encrypt_data(data: String) -> Result<Vec<u8>, String> {
    /*
     * Prepare cipher config with the key
     */
    let key_bytes: [u8; 32] = (&*SYSTEM_ENCRYPTION_KEY)
        .as_slice()
        .try_into()
        .map_err(|_| "Key must be exactly 32 bytes")?;

    let key = Key::<Aes256Gcm>::from(key_bytes);
    let cipher = Aes256Gcm::new(&key);
    /*
     * generating the nonce
     * This should be generated every time there is a need for encrypting somthing
     */
    let mut nonce_bytes = [0u8; 12];
    rand::rng().fill(&mut nonce_bytes);
    let nonce = Nonce::from(nonce_bytes);
    /*
     encrypting the serialized data
    */
    let ciphertext = cipher
        .encrypt(&nonce, data.as_bytes())
        .map_err(|e| e.to_string())?;
    /*
     Preparing the final encrypted data and appending the serialized data
    */
    let mut final_output: Vec<u8> = Vec::new();
    final_output.extend_from_slice(&nonce);
    final_output.extend_from_slice(&ciphertext);
    Ok(final_output)
}

/*
 * Method to decrypt the provided file using aes_gcm
 */
pub fn decrypt_data(encrypted_file: &Vec<u8>) -> Result<String, String> {
    /*
    Length check to make sure the file isn't corrupted
    */
    if encrypted_file.len() < 12 {
        return Err(String::from("File may have been corrupted"));
    }
    /*
     * Prepare cipher config with the key
     */
    let key_bytes: [u8; 32] = (&*SYSTEM_ENCRYPTION_KEY)
        .as_slice()
        .try_into()
        .map_err(|_| "Key must be exactly 32 bytes")?;

    let key = Key::<Aes256Gcm>::from(key_bytes);
    let cipher = Aes256Gcm::new(&key);
    /*
     * Destructure nonce and cipher text from the encrypted file
     * and then extracting and fromating the nonce to prepare the file for decryption
     */
    let (nonce_slice, cipher_text) = encrypted_file.split_at(12); // here spliting at 12th index because the nonce is 12 bit
    let nonce_bytes: [u8; 12] = nonce_slice
        .try_into()
        .expect("Failed to extract 12 bit nonce");
    let nonce = Nonce::from(nonce_bytes);
    /*
     * Finally prepare the decrypted bytes into serialized string
     */
    let unecrypted_bytes = cipher
        .decrypt(&nonce, cipher_text)
        .map_err(|e| e.to_string())?;
    let final_output: String = String::from_utf8(unecrypted_bytes).map_err(|e| e.to_string())?;
    Ok(final_output)
}
