import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { useCallback, useEffect, useState } from "react";
import { SliderButton } from "../SliderButton";
import { GrGithub } from "react-icons/gr";
import { getVersion } from "@tauri-apps/api/app";
import { BsYoutube } from "react-icons/bs";
// import { IoWarningSharp } from "react-icons/io5";
import RecordKeyBind from "../RecordKeyBind";
import Warning from "../settings/Warning";
import { QuickAcces, QuickAccesShortcut } from "../../utils/RegisterShortcut";
import { keybinds } from "../../utils/Keybinds";

const AppVersion = await getVersion();
const gh = "https://github.com/Smug-Cat-s-Den/Copy-Chan";
const yt = "https://www.youtube.com/@smug_cats_den";

const Settings = () => {
  const [isStartUpEnabled, SetStartUp] = useState<boolean>(true);
  const [PersistOnDive, SetPersistOnDive] = useState<boolean>(false);

  const StartUpCheck = useCallback(async () => {
    let isStartUpEnabled = await isEnabled();
    SetStartUp(isStartUpEnabled);
  }, [isEnabled]);

  const HandleStartUp = () => {
    isStartUpEnabled ? disable() : enable();
    StartUpCheck();
  };

  useEffect(() => {
    StartUpCheck();
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
        <h1>Others</h1>
        <div className="flex justify-between  items-center">
          <span className="text-sm">Max Clipboard entries</span>
          <div
            className={`p-2 bg-linear-to-r from-blue-600  via-blue-600/90 transition duration-300 ease-in-out to-blue-600 text-white my-2 rounded-md text-sm`}
          >
            <input placeholder="20" className="w-10 text-center" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Persist clipbord on drive</span>
          <SliderButton value={PersistOnDive} SetValue={SetPersistOnDive} />
        </div>
      </section>
      <footer>
        <section className="select-none flex gap-2 items-end">
          <img src={"/Copychan.png"} alt="copychan" draggable="false" width={100} />
          <div className="pb-3">
            <h1 className="text-[13px] dark:text-gray-300 text-gray-700">build {AppVersion}</h1>
            <h1>Support me</h1>
            <span className="flex gap-2">
              <a href={gh} target="_blank">
                <GrGithub size={20} className="hover:text-blue-300" />
              </a>
              <a href={yt} target="_blank">
                <BsYoutube size={20} className="hover:text-red-500" />
              </a>
            </span>
          </div>
        </section>
      </footer>
    </main>
  );
};

export default Settings;
