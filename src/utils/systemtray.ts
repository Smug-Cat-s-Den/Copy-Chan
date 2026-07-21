import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { invoke } from "@tauri-apps/api/core";
import { resolveResource } from "@tauri-apps/api/path";

export async function setupTray() {
  const menu = await Menu.new({
    items: [
      {
        id: "show_app",
        text: "show app",
        action: async () => {
          await invoke("show_window");
        },
      },
      {
        id: "quit",
        text: "quit App",
        action: async () => {
          await invoke("close_programe");
        },
      },
    ],
  });
  const resourcePath = await resolveResource("icons/CopychanSmol.png");
  const tray = await TrayIcon.new({
    icon: resourcePath,
    id: "tray_app",
    tooltip: "show items",
    menu,
    menuOnLeftClick: true,
  });
  console.log("tray called");
  return tray;
}
