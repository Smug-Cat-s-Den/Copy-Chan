/**
 * Reference logic implementation for encryption and decryption
 */
use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Key, Nonce,
};

/// Takes your master key and the raw JSON/Bincode bytes, returns the file payload.
pub fn _encrypt_data(master_key: &[u8; 32], plaintext_bytes: &[u8]) -> Result<Vec<u8>, String> {
    // 1. Load your master key
    let key = Key::<Aes256Gcm>::from_slice(master_key);
    let cipher = Aes256Gcm::new(key);

    // 2. Generate a brand new, unique 12-byte Nonce for THIS save operation
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);

    // 3. Encrypt the data. AES-GCM automatically adds a 16-byte authentication tag
    // to the end of the ciphertext to prevent tampering.
    let ciphertext = cipher
        .encrypt(&nonce, plaintext_bytes)
        .map_err(|_| "Encryption failed")?;

    // 4. Prepend the 12-byte Nonce to the front of the ciphertext.
    // This combined Vec is what you actually write to `copyhistory.json`.
    let mut final_file_payload = Vec::new();
    final_file_payload.extend_from_slice(nonce.as_slice());
    final_file_payload.extend_from_slice(&ciphertext);

    Ok(final_file_payload)
}

/// Takes your master key and the raw bytes read from the file, returns the decrypted bytes.
pub fn _decrypt_data(master_key: &[u8; 32], file_payload: &[u8]) -> Result<Vec<u8>, String> {
    // A valid payload must be at least 12 bytes (Nonce) + 16 bytes (Auth Tag)
    if file_payload.len() < 28 {
        return Err("File is corrupted or too small".into());
    }

    let key = Key::<Aes256Gcm>::from_slice(master_key);
    let cipher = Aes256Gcm::new(key);

    // 1. Split the payload back into the Nonce and the Ciphertext
    let (nonce_bytes, ciphertext) = file_payload.split_at(12);
    let nonce = Nonce::from_slice(nonce_bytes);

    // 2. Decrypt. If the file was tampered with, this will automatically fail
    // because the built-in Auth Tag won't match.
    let plaintext_bytes = cipher
        .decrypt(nonce, ciphertext)
        .map_err(|_| "Decryption failed (tampered data or wrong key)")?;

    Ok(plaintext_bytes)
}
