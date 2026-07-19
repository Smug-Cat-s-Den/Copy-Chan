import { getCurrentWindow } from "@tauri-apps/api/window";
import { Emojies, GroupedEmojies } from "../types/app.types";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { invoke } from "@tauri-apps/api/core";
export const appWindow = getCurrentWindow();
export const currentWindow = WebviewWindow.getCurrent();

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
