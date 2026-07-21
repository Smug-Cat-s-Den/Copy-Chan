import { useEffect, useState } from "react";
import "./App.css";
import Copy from "./components/tabs/Copy";
import { TabItem } from "./types/app.types";
import Nav from "./components/nav/Nav";
import { setupTray } from "./utils/systemtray";
import Settings from "./components/tabs/Settings";
import { RegisterShortCuts } from "./utils/RegisterShortcut";
import EmojiPicker from "./components/tabs/EmojiPicker";

// Emojis Array
import { graphicEmojiArray } from "./EmojiData/Visual";
import { symbolEmoticonArray } from "./EmojiData/SymbolsAndASCII";

//shortcut

function App() {
  const [ActiveTab, SetActiveTab] = useState<TabItem>({ label: "Copy" });

  useEffect(() => {
    setupTray();
    RegisterShortCuts();
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
