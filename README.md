# Copy Chan — Smol Clipboard manager :3 <br>![Copy Chan](src-tauri/icons/Copychan.png)

**Copy Chan** is a cross-platform desktop clipboard/history manager with a Emoji and symbols picker, built with **Tauri (Rust)** and **React + Vite**. Primarily made and optimized for **linux**.
<br>this README explains what the project is, how to run it locally, and known issues you may encounter if you plan to run it.
<br/>
check [release](https://github.com/aditya-wuw/Copy-Chan/releases/tag/0.0.8) for more information about how to install this app **(Only Linux)**
<br>
if you found this helpful make sure to 🌟 star this project and [follow](https://github.com/aditya-wuw) for more future ventures (＾ ▽ ＾)/

## ⚠️ Important Info

This project relies on some dependencies that are used for encrypting the saved clipboard data. Please consider installing them first before proceeding with the actual installation.
```bash  
sudo apt install libsecret-1-0 gnome-keyring
```


## 🚧 Current status: under testing

This project is open-source for transparency and personal use. If you would like to make changes, please feel free to fork the repository. <br>bug reports are welcome. If you encounter an issue, feel free to open an issue on GitHub, though please note that updates may be infrequent :/

##

- Copy chan is currently under testing
- Under development: extra features.
- Expect frequent breaking changes, refactors, and incomplete features.

## 🔎 What this project aims to be

Copy chan aims to be a lightweight, privacy-respecting clipboard manager for Linux and other platforms with features such as:

- Persistent clipboard history ✅
- data encryption ✅
- Keyboard shortcuts to open history and paste entries near user's ✅
- Small, native desktop experience using Tauri (low overhead) ✅
- a section for picking Emojis and symbols ✅
- system-tray/minimize-to-tray behavior ✅

some features will be added in the future, like:

- custom limit for records
- customizable theme
- customizable shortcut
- button to have the clipboard refresh on startup (delete all records every boot)

and many more (≧◡≦)

## 🧭 Tech stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Desktop shell / Native: Tauri (Rust)

## ▶️ Run locally (development)

Prerequisites:

- NodeJS (v18+ recommended) and npm or pnpm
- Rust toolchain and cargo (for Tauri / desktop builds)
- Platform dependencies for WebKitGTK (see Troubleshooting below)

Typical steps to run the app in development mode (frontend):

```bash
# install frontend deps
npm install

# run Vite development server
npm run dev
```

To run the Tauri desktop build/dev mode (desktop + Rust backend):

```bash
# start development with Tauri (may build both frontend and backend code)
npm run tauri dev
```

To build production packages:

```bash
npm run build
# then build native packages with the Tauri CLI
npm run tauri build
```

```bash
 #Note: Currently the data for the Clipbord is stored in ./data/copy_data.json in the project root
 this directory will automatically be implemented during build or dev command

```

If you've never used Tauri before, you can find the official docs here: https://tauri.app

## ⚠️ Known issues / Linux troubleshooting

1. "Gtk-Message: Failed to load module 'canberra-gtk-module'"

   - This usually means the optional sound/event module is missing. On Debian/Ubuntu you can install:

   ```bash
   sudo apt install libcanberra-gtk-module libcanberra-gtk3-module
   ```

2. WebKit / Snap incompatibility (common)

   - You may encounter errors like:

     ```text
     /usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/WebKitNetworkProcess: symbol lookup error: /snap/core20/current/lib/x86_64-linux-gnu/libpthread.so.0: undefined symbol: __libc_pthread_init, version GLIBC_PRIVATE
     ```

   - This happens when WebKitGTK picks up incompatible libraries from a Snap environment (for example, running from a snapped VS Code terminal). Try:

   ```bash
   # run the dev server from a normal system terminal (not a snapped app's terminal)
   unset LD_LIBRARY_PATH
   npm run tauri dev
   ```

   - Or install WebKitGTK system packages using your distro package manager (e.g. `libwebkit2gtk-4.0-dev` / `libwebkit2gtk-4.1` on Debian/Ubuntu) so the system libs are consistent.
