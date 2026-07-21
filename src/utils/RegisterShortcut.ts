import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  register,
  ShortcutEvent,
  unregister,
  unregisterAll,
} from "@tauri-apps/plugin-global-shortcut";
import { store } from "./utils";
import { keybinds } from "./Keybinds";

/*
Default shortcuts
*/
export let QuickAccesShortcut: string = keybinds.QuickAccess.key;

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
export const QuickAcces = async (_NewShortCut?: string) => {
  try {
    if (_NewShortCut) {
      await unregister(QuickAccesShortcut);
      QuickAccesShortcut = _NewShortCut;
    }
    const FetchShortCut: string | undefined = await store.get(keybinds.QuickAccess.id);
    if (FetchShortCut) {
      QuickAccesShortcut = FetchShortCut;
    }
    console.log(QuickAccesShortcut);
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
