import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDone } from "react-icons/md";

const DefaultKeyBing = "Ctrl+Alt+S"; //added for testing
export default function RecordKeyBind() {
  const [StartRecord, SetRecordStatus] = useState<boolean>(false);
  const [KeyBind, setKeyBind] = useState<string[]>(DefaultKeyBing.split("+"));

  useEffect(() => {
    if (!StartRecord) return;

    const SetNewKeyBind = (k: string[]) => {
      console.log("Final Key bind to set", k.join("+"));
    };

    const KeyListner = (e: KeyboardEvent) => {
      let Pressed = e.key === "Control" ? "Ctrl" : e.key;

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
            return [...prev, Pressed];
          });
          break;
        }
      }
    };

    window.addEventListener("keydown", KeyListner);

    return () => {
      window.removeEventListener("keydown", KeyListner);
      setKeyBind((prev) => {
        if (prev.length === 0) return DefaultKeyBing.split("+"); //set the default values
        SetNewKeyBind(prev);
        return prev;
      });
    };
  }, [StartRecord]);

  return (
    <div
      className={`p-2 bg-linear-to-r from-blue-600  ${StartRecord ? "via-blue-600/90" : "via-blue-600/30"} transition duration-300 ease-in-out to-blue-600 text-white my-2 rounded-md text-sm`}
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
            setKeyBind((prev) => {
              if (StartRecord === false) return [];
              return prev;
            });
            SetRecordStatus(!StartRecord);
          }}
        >
          {StartRecord ? (
            <MdDone className="bg-blue-700 p-1 animate-fade-up rounded-sm" size={15} />
          ) : (
            <BiEditAlt className="animate-fade-up" size={15} />
          )}
        </span>
      </div>
    </div>
  );
}
