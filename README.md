# Copy Chan — Smol Clipboard manager :3 <br>![Copy Chan](assets/Copychan.png)

**Copy Chan** is a cross-platform clipboard manager with an emoji and symbols picker, built with **Tauri**

## 🔎 What this project aims to be

Copy chan aims to be a lightweight, privacy-respecting persisting clipboard manager for Linux and other platforms with features such as:

- ✅ **Data encryption**
- ✅ **Custom limit for records (up to 100)**
- ✅ **Persistent clipboard history (even after restart)**
- ✅ **A section for picking Emojis and symbols**
- ✅ **Customizable shortcut key**
- ✅ **Keyboard shortcut to open the app near user's cursor**
- ✅ **Small, native desktop experience using Tauri**

some features will be added in the future, like:

- **Image snippet**
- **Customizable theme**

and many more (≧◡≦)

## 🧭 Tech stack

- **Frontend :** React + TypeScript + Vite
- **Styling :** Tailwind CSS
- **Desktop level Apis :** Tauri Rust
- **Bundling :** Github Actions

## **🚧 Status : Active Development**

**( natively tested and used on Ubuntu LTS and Windows 11 )**

This project is open-source for transparency and personal use. If you would like to make changes, please feel free to fork the repository. Bug reports are welcome. If you encounter an issue, feel free to open an issue on GitHub

- Expect frequent breaking changes, refactors, and incomplete features.

## ▶️ Run locally (development)

Prerequisites:

- NodeJS (v18+ recommended) and npm or pnpm
- Rust toolchain and cargo (for Tauri / desktop builds)
- Platform dependencies for WebKitGTK (see Troubleshooting below)

## Typical steps to run the app in development mode (frontend):

To run the Tauri desktop build/dev mode (desktop + Rust backend) you can use the following mono repo commands:

```bash
# start development with Tauri (may build both frontend and backend code)
pnpm dev:desktop
```

To build production packages:

```bash
# then build native packages with the Tauri CLI
pnpm build:desktop
```

If you've never used Tauri before, you can find the official [docs]("https://tauri.app")

## ⚠️ Important Info

This project relies on some dependencies that are used for encrypting the clipboard data. Please make sure you have a keyring package setup before proceeding with building the application.
<br>

- Ubuntu / Debian / Mint

```bash
   sudo apt install libsecret-1-0 gnome-keyring
```

- Fedora / RHEL / Rocky

```bash
   sudo dnf install libsecret gnome-keyring
```

- Arch Linux BTW / Manjaro

```bash
   sudo pacman -S libsecret gnome-keyring
```
