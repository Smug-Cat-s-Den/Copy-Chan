import { useEffect, useState } from "react";
import "./App.css";
import Copy from "./components/tabs/Copy";
import { TabItem } from "./types/app.types";
import Nav from "./components/nav/Nav";
import { SetupTray } from "./Utils/Systemtray";
import Settings from "./components/tabs/Settings";
import { RegisterShortCuts } from "./Utils/RegisterShortcut";
import EmojiPicker from "./components/tabs/EmojiPicker";
import { AppVersion, appWindow, store } from "./Utils/Utils";

//Emoji datasets
import { graphicEmojiArray } from "./EmojiData/Visual";
import { symbolEmoticonArray } from "./EmojiData/SymbolsAndASCII";
import Onboarding from "./components/settings/Onboarding";

function App() {
  const [ActiveTab, SetActiveTab] = useState<TabItem>({ label: "Copy" });
  const [isOnboarded, setisOnboarded] = useState<boolean>(false);
  const FetchOnboarded = async () => {
    let Onboarded = (await store.get("Onboarded")) as boolean;
    setisOnboarded(Onboarded);
  };

  /**
   * Initial Setup
   */
  useEffect(() => {
    FetchOnboarded();
    setisOnboarded(false);
    SetupTray();
    RegisterShortCuts();
  }, []);

  /**
   * Auto Hide on focus loss
   */
  useEffect(() => {
    if (!isOnboarded) return;
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
          }, 150);
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
  }, [isOnboarded]);

  if (!isOnboarded) return <Onboarding setisOnboarded={setisOnboarded} />;
  else
    return (
      <main className="container select-none">
        <Nav ActiveTab={ActiveTab} SetActiveTab={SetActiveTab} />
        <strong className="flex justify-center">{ActiveTab.label}</strong>
        <div className="content overflow-y-scroll h-83 scroll-smooth mx-1 rounded-2xl">
          {ActiveTab.label === "Copy" && <Copy />}
          {ActiveTab.label === "Symbols" && (
            <EmojiPicker title={ActiveTab.label} emotes={symbolEmoticonArray} />
          )}
          {ActiveTab.label === "Emoji" && (
            <EmojiPicker title={ActiveTab.label} emotes={graphicEmojiArray} />
          )}
          {ActiveTab.label === "Settings" && <Settings />}
        </div>
        {AppVersion.toLocaleLowerCase().includes("preview") && (
          <div className="h-0 text-right w-full text-[12px] text-gray-400 px-5">
            preview build {AppVersion.replace("-preview", "")} - experimental
          </div>
        )}
      </main>
    );
}

export default App;
