import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut";

export async function register_shortcut() {
  await unregisterAll();
  const shortcut_open = "Ctrl+Alt+S";
  await register(shortcut_open, async () => {
    await invoke("show_window_using_shortcut");
  });
  setupWindowListeners();
}

export function setupWindowListeners() {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      getCurrentWindow().hide();
    }
  });
}
