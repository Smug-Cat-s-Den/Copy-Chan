import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  register,
  ShortcutEvent,
  unregister,
  unregisterAll,
} from "@tauri-apps/plugin-global-shortcut";
import { store } from "./utils";

/*
Default shortcuts
*/
let QuickAccesShortcut: string = "Ctrl+Alt+S";

/*
  Hide the app
*/
const HideShortcut = () => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      getCurrentWindow().hide();
    }
  });
};

/*
  Quick Access
*/
const QuickAcces = async (_NewShortCut?: string) => {
  try {
    const FetchShortcut: string | undefined = await store.get("QuickAcces");
    console.log(FetchShortcut); //debug
    if (FetchShortcut) {
      QuickAccesShortcut = FetchShortcut;
    }
    if (_NewShortCut) {
      await unregister(QuickAccesShortcut);
      QuickAccesShortcut = _NewShortCut;
    }
    await register(QuickAccesShortcut, async (e: ShortcutEvent) => {
      if (e.state == "Pressed") {
        await invoke("show_window_using_shortcut");
      }
    });
  } catch (e) {
    console.error("Failed to register shortcut for QuickAcces :", e);
  }
};

export async function RegisterShortCuts() {
  await unregisterAll();
  QuickAcces();
  HideShortcut();
}
