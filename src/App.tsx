import { useEffect, useState } from "react";
import "./App.css";
import Copy from "./components/tabs/Copy";
import { TabItem } from "./types/app.types";
import Nav from "./components/nav/Nav";
import { setupTray } from "./utils/systemtray";
import Settings from "./components/tabs/Settings";
import { register_shortcut } from "./utils/RegisterShortcut";
import EmojiPicker from "./components/tabs/EmojiPicker";

// Emojis Array
import { graphicEmojiArray } from "./EmojiData/Visual";
import { symbolEmoticonArray } from "./EmojiData/SymbolsAndASCII";

//shortcut

function App() {
  const [ActiveTab, SetActiveTab] = useState<TabItem>({ label: "copy" });

  useEffect(() => {
    import("./components/tabs/EmojiPicker");
    setupTray();
    register_shortcut();
  }, []);

  return (
    <main className="container select-none">
      <Nav ActiveTab={ActiveTab} SetActiveTab={SetActiveTab} />
      <strong className="flex justify-center">{ActiveTab.label}</strong>
      <div className="content overflow-y-scroll h-84 scroll-smooth mx-1 rounded-2xl">
        {ActiveTab.label === "copy" && <Copy />}
        {ActiveTab.label === "emoji" && (
          <EmojiPicker title={ActiveTab.label} emotes={graphicEmojiArray} />
        )}
        {ActiveTab.label === "symbols" && (
          <EmojiPicker title={ActiveTab.label} emotes={symbolEmoticonArray} />
        )}
        {ActiveTab.label === "Settings" && <Settings />}
      </div>
    </main>
  );
}

export default App;
