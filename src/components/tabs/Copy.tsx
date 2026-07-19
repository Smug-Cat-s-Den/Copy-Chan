import  { useEffect, useState } from "react";
import { history } from "../../types/app.types";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { HandleCopy } from "../../utils/utils";
import Records from "../Records";
import { VscPin } from "react-icons/vsc";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ask } from "@tauri-apps/plugin-dialog";

const Copy = () => {
  const [History, setHistory] = useState<history[]>([]);
  const [Pinned, setPinned] = useState<history[]>([]);

  async function fetchHistory() {
    let history: history[] = await invoke("get_history");
    const Pinned: history[] = [];
    const notPinned: history[] = [];
    for (const rec of history) {
      rec.pinned ? Pinned.push(rec) : notPinned.push(rec);
    }
    setPinned(Pinned);
    setHistory(notPinned);
  }

  async function removeHistory(id: string) {
    await invoke("del_entry", { id: id });
    fetchHistory();
  }

  async function PinHistory(id: string) {
    await invoke("pin_history", { id: id });
    fetchHistory();
  }

  async function delete_all_records() {
    invoke("delete_all");
    fetchHistory();
  }

  // Inside your component
  const handleClearAll = async () => {
    const confirmed = await ask("Are you sure you want to clear everything?", {
      title: "",
      cancelLabel: "no thank u :3",
      kind: "warning",
    });

    if (confirmed) {
      delete_all_records();
    }
  };

  listen("clipboard-changed", async () => {
    fetchHistory();
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
      <main className="mr-1 rounded-2xl">
        {History.length > 0 && (
          <div className="flex justify-end mx-2 sticky top-2">
            <button
              onClick={() => handleClearAll()}
              className="group relative flex text-xs items-center p-1 bg-red-400/80 backdrop-blur-[2px] drop-shadow-2xl rounded-md "
            >
              <RiDeleteBin6Fill /> +
              <span className="bg-blue-600 z-10 group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-white rounded absolute w-15 right-9 -top-0.5 p-2">
                clear all
                <div className="h-2 w-2 rotate-45 bg-blue-600 absolute -right-1 top-2" />
              </span>
            </button>
          </div>
        )}

        {Pinned.length > 0 && (
          <div>
            <h1 className="mx-3 flex gap-2 text-md">
              <VscPin />
              Pinned
            </h1>
            {Pinned.map((i, index) => (
              <Records
                key={index}
                i={i}
                HandleCopy={HandleCopy}
                PinHistory={PinHistory}
                removeHistory={removeHistory}
              />
            ))}
            <h1 className="flex justify-center border-b border-blue-300 mx-2 pb-4" />
          </div>
        )}
        <div className="mt-5">
          {History.length !== 0 ? (
            History.map((i, index) => (
              <Records
                key={index}
                i={i}
                HandleCopy={HandleCopy}
                removeHistory={removeHistory}
                PinHistory={PinHistory}
              />
            ))
          ) : (
            <span className="flex justify-center mt-3 ml-3">maybe copy something :3</span>
          )}
        </div>
      </main>
  );
};

export default Copy;
