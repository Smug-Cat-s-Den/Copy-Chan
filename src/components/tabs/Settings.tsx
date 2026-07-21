import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { useCallback, useEffect, useState } from "react";
import { SliderButton } from "../SliderButton";
import RecordKeyBind from "../RecordKeyBind";
import Warning from "../settings/Warning";
import { QuickAcces, QuickAccesShortcut } from "../../utils/RegisterShortcut";
import { keybinds } from "../../utils/Keybinds";
import { invoke } from "@tauri-apps/api/core";
import { store } from "../../utils/utils";
import Footer from "../Footer";

const Settings = () => {
  const [isStartUpEnabled, SetStartUp] = useState<boolean>(true);
  const [DefaultMaxEntires, SetDefaultMaxEntires] = useState<number>();
  const [isValidEntry, setisValidEntry] = useState<boolean>(true);


  /*
    Startup check
  */
  const StartUpCheck = useCallback(async () => {
    let isStartUpEnabled = await isEnabled();
    SetStartUp(isStartUpEnabled);
  }, [isEnabled]);

  /*
    Function to update the maximum number of entries user can add
  */
  const HandleMaxEntries = async (e: EventTarget & HTMLInputElement) => {
    let Val:number = Number(e.value);
    if (!isValidEntry) {
      e.value = String(DefaultMaxEntires)
      setisValidEntry(true);
      return;
    };
    SetDefaultMaxEntires(Val);
    store.set("MaxEntries", Val)
    await invoke("update_max_entries_on_memory", { newValue: Val });
  };


  const FetchFromConfig = async () => {
    /* Max Entries */
    let enties: number | undefined = await store.get("MaxEntries")
    console.log(enties);
    SetDefaultMaxEntires(enties ?? 20);
  }

  const HandleStartUp = () => {
    isStartUpEnabled ? disable() : enable();
    StartUpCheck();
  };

  /**
   * Settings entry point
   */
  useEffect(() => {
    StartUpCheck();
    FetchFromConfig();
  }, []);

  return (
    <main className="px-3 animate-fade-in">
      <section className="bg-blue-600/20 p-3 rounded-md">
        <div className="flex justify-between items-center">
          <strong>Enable StartUp</strong>
          <SliderButton value={isStartUpEnabled} SetValue={SetStartUp} DoSomthing={HandleStartUp} />
        </div>
        <p className="text-[13px] mt-3  text-gray-300">
          Automatically launches the application as soon as your operating system boots up
        </p>
      </section>
      <section className="mt-3 bg-blue-600/20 p-3 rounded-md ">
        <div className="flex justify-between  items-center">
          <h1>Quick access CopyChan</h1>
          <RecordKeyBind
            Id={keybinds.QuickAccess.id}
            DefaultKeyBind={QuickAccesShortcut}
            Update={QuickAcces}
          />
        </div>
        <div className="text-[13px] mt-2 text-gray-300">
          Quickly open up the application, hide using "Escape" key
          <Warning />
        </div>
      </section>
      <section className="mt-3 bg-blue-600/20 p-3 rounded-md ">
        <div className="flex justify-between  items-center">
          <span className="">Max Clipboard entries (Max 100)</span>
          <div
            className={`p-2 ${isValidEntry ? "bg-linear-to-r from-blue-600  via-blue-600/90 to-blue-600" : "bg-red-500"}  transition duration-300 ease-in-out  text-white my-2 rounded-md text-sm`}
          >
            <input
              type="number"
              placeholder="20"
              className="w-10 text-center outline-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none"
              defaultValue={DefaultMaxEntires}
              onChange={(e) => {
                let v = Number(e.target.value);
                setisValidEntry(v > 4 && v <= 100 && v != 0);
              }}
              onBlur={(e) => HandleMaxEntries(e.currentTarget)}
            />
          </div>
        </div>
        <p className="text-[13px] mt-3  text-gray-300">
          Edit the maximum number of entries to record
        </p>
      </section>
      <section className="mt-3 bg-blue-600/20 p-3 rounded-md ">
       <Footer/>
      </section>
    </main>
  );
};

export default Settings;
