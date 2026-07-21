import { getCurrentWindow } from "@tauri-apps/api/window";
import { Emojies, GroupedEmojies } from "../types/app.types";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { invoke } from "@tauri-apps/api/core";
import { Store } from "@tauri-apps/plugin-store";

export const appWindow = getCurrentWindow();
export const currentWindow = WebviewWindow.getCurrent();
export const store = await Store.load("config.json", { autoSave: false });

export async function HandleCopy(item: string) {
  if (!item) return;
  await invoke("copy_and_ignore", { item });
  await appWindow.hide();
}

export function ParseAndGroupEmoji(item: Emojies[]) {
  return item.reduce((acc, curr) => {
    const Emojitype = curr.type;
    if (!acc[Emojitype]) {
      acc[Emojitype] = [];
    }
    acc[Emojitype].push(curr);
    return acc;
  }, {} as GroupedEmojies);
}

export const FormatKeys = (K: KeyboardEvent): string => {
  return K.key === "Control"
    ? "Ctrl"
    : K.key === "Meta"
      ? ""
      : K.code.replace(/Key|Left|Right|Digit|Numpad/g, "");
};

export const ValidateKeybinds = (Keybind: string[]): boolean => {
  // if (Keybind.length !== 1) return false;
  console.log(Keybind);
  const [k1, k2, k3] = Keybind;
  const BannedKeybinds = ["tab", "capslock", "escape", "enter"];
  if (k1 === k2 || k2 === k3 || k3 === k1) return false;
  let HasBannedKeyfound = Keybind.some((k) => BannedKeybinds.includes(k.toLowerCase()));
  console.log("found banned key", HasBannedKeyfound);
  if (HasBannedKeyfound) return false;
  return true;
};
