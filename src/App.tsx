import { useEffect, useState } from "react";
import "./App.css";
import Copy from "./components/tabs/Copy";
import { TabItem } from "./types/app.types";
import Nav from "./components/nav/Nav";
import { setupTray } from "./Utils/systemtray";
import Settings from "./components/tabs/Settings";
import { RegisterShortCuts } from "./Utils/RegisterShortcut";
import EmojiPicker from "./components/tabs/EmojiPicker";
import { appWindow } from "./Utils/Utils";

//Emoji datasets
import { graphicEmojiArray } from "./EmojiData/Visual";
import { symbolEmoticonArray } from "./EmojiData/SymbolsAndASCII";

function App() {
  const [ActiveTab, SetActiveTab] = useState<TabItem>({ label: "Copy" });
  /**
   * Initial Setup
   */
  useEffect(() => {
    setupTray();
    RegisterShortCuts();
  }, []);

  /**
   * Auto Hide on focus loss
   */
  useEffect(() => {
    let unlisten: (() => void) | undefined;
    let FocusTimeout: NodeJS.Timeout | null = null;
    const setupListener = async () => {
      unlisten = await appWindow.onFocusChanged(async ({ payload: focused }) => {
        if (FocusTimeout) {
          clearTimeout(FocusTimeout);
          FocusTimeout = null;
        }

        if (!focused) {
          FocusTimeout = setTimeout(async () => {
            await appWindow.hide();
          }, 50);
        }
      });
    };
    setupListener();

    return () => {
      if (unlisten) {
        unlisten();
        if (FocusTimeout) {
          clearTimeout(FocusTimeout);
        }
      }
    };
  }, []);

  return (
    <main className="container select-none">
      <Nav ActiveTab={ActiveTab} SetActiveTab={SetActiveTab} />
      <strong className="flex justify-center">{ActiveTab.label}</strong>
      <div className="content overflow-y-scroll h-84 scroll-smooth mx-1 rounded-2xl">
        {ActiveTab.label === "Copy" && <Copy />}
        {ActiveTab.label === "Symbols" && (
          <EmojiPicker title={ActiveTab.label} emotes={symbolEmoticonArray} />
        )}
        {ActiveTab.label === "Emoji" && (
          <EmojiPicker title={ActiveTab.label} emotes={graphicEmojiArray} />
        )}
        {ActiveTab.label === "Settings" && <Settings />}
      </div>
    </main>
  );
}

export default App;
