import { useEffect, useRef, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { FormatKeys, store, ValidateKeybinds } from "../Utils/Utils";
import { RegisterShortCuts } from "../Utils/RegisterShortcut";
import { unregisterAll } from "@tauri-apps/plugin-global-shortcut";

interface props {
  Id: string;
  DefaultKeyBind: string;
  Update: (k: string) => Promise<void>;
}

let OneTime: boolean = true;
export default function RecordKeyBind({ Id, DefaultKeyBind, Update }: props) {
  const ButtonRef = useRef<HTMLButtonElement>(null);
  const [StartRecord, SetRecordStatus] = useState<boolean>(false);
  const [KeyBind, setKeyBind] = useState<string[]>(() =>
    DefaultKeyBind ? DefaultKeyBind.trim().split("+") : [],
  );
  const [isValid, setValid] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Set the Display keybind
     */
    if (OneTime) {
      setKeyBind(DefaultKeyBind.trim().split("+"));
      OneTime = false;
      //this default is used to initialize the KeyBind state with the stored keybind fetched from RegisterShortcut.ts
    }
    setKeyBind((prev) => {
      if (StartRecord) {
        unregisterAll(); //disable all keybinds
        return [];
      }
      RegisterShortCuts();
      // console.log(prev);
      return prev;
    });

    if (!StartRecord) return;
    /**
      Update the keybind
    */
    const SetNewKeyBind = async (k: string[]) => {
      const Keybind = k.join("+").trim();
      await store.set(Id, Keybind); // store it locally
      Update(Keybind); // update the keybind;
    };

    const KeyListner = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      let Pressed = FormatKeys(e);

      switch (Pressed) {
        case "Escape": {
          SetRecordStatus(false);
          break;
        }
        case "Enter": {
          SetRecordStatus(false);
          setKeyBind((prev) => {
            SetNewKeyBind(prev);
            return prev;
          });
          break;
        }
        case "Backspace": {
          setKeyBind((prev) => prev.slice(0, -1));
          break;
        }
        default: {
          setKeyBind((prev) => {
            let last = prev[prev.length - 1];
            if (prev.length > 2) {
              return [];
            }
            if (last === Pressed || Pressed === "Escape") {
              return prev;
            }
            const nextKeys = [...prev, Pressed.length === 1 ? Pressed.toUpperCase() : Pressed];
            setValid(ValidateKeybinds(nextKeys));
            //
            return nextKeys;
          });
          break;
        }
      }
    };
    /*
      On clicking outside or focus loss
    */
    const HandleFocusLoss = (event: MouseEvent) => {
      if (ButtonRef.current && !ButtonRef.current.contains(event.target as Node)) {
        setKeyBind(KeyBind);
        SetRecordStatus(false);
        setValid(true);
      }
    };

    window.addEventListener("keydown", KeyListner);
    window.addEventListener("mousedown", HandleFocusLoss);

    return () => {
      window.removeEventListener("keydown", KeyListner);
      window.removeEventListener("mousedown", HandleFocusLoss);
      setKeyBind((prev) => {
        if (prev.length === 0) return KeyBind; //Reset values
        SetNewKeyBind(prev);
        return prev;
      });
    };
  }, [StartRecord]);

  return (
    <button
      ref={ButtonRef}
      className={`p-2 outline-2 outline-blue-600/70 ${isValid ? "bg-linear-to-r" : "bg-red-500/80"}  from-blue-600  ${StartRecord ? "via-blue-600/90" : "via-blue-600/30"} transition duration-300 ease-in-out to-blue-600 text-white my-2 rounded-md text-sm`}
    >
      <div className="flex items-center justify-between">
        <div className="w-30 overflow-hidden">
          {KeyBind.length === 0 ? (
            <span className="text-white/60">Listening ...</span>
          ) : (
            KeyBind?.join("+")
          )}
        </div>
        <span
          onClick={() => {
            SetRecordStatus(!StartRecord);
          }}
        >
          {StartRecord ? (
            <MdDone className="bg-blue-700 p-1 animate-fade-up rounded-sm" size={18} />
          ) : (
            <BiEditAlt className="animate-fade-up" size={18} />
          )}
        </span>
      </div>
    </button>
  );
}
