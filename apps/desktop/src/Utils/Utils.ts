import { getCurrentWindow } from "@tauri-apps/api/window";
import { Emojies, GroupedEmojies } from "../types/app.types";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Store } from "@tauri-apps/plugin-store";
import { invoke } from "@tauri-apps/api/core";
import { getName, getVersion } from "@tauri-apps/api/app";

export const appWindow = getCurrentWindow();
export const currentWindow = WebviewWindow.getCurrent();
export const store = await Store.load("config.json", { autoSave: false });
export const AppVersion = await getVersion();
export const AppName = await getName();
/*
Copy logic shared between Emoji picker and Clipboard tab
*/
export async function HandleCopy(item: string, isImage: boolean) {
  if (!item) return;
  await invoke("copy_and_ignore", { item: item, isImage: isImage });
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
  // console.log(Keybind);
  const [k1, k2, k3] = Keybind;
  const BannedKeybinds = ["tab", "capslock", "escape", "enter"];
  if (k1 === k2 || k2 === k3 || k3 === k1) return false;
  let HasBannedKeyfound = Keybind.some((k) => BannedKeybinds.includes(k.toLowerCase()));
  // console.log("found banned key", HasBannedKeyfound);
  if (HasBannedKeyfound) return false;
  return true;
};
