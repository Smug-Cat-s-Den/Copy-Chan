import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { useCallback, useEffect, useState } from "react";
import { SliderButton } from "../SliderButton";
import { GrGithub } from "react-icons/gr";
import { getVersion } from "@tauri-apps/api/app";
import { BsYoutube } from "react-icons/bs";
import { IoWarningSharp } from "react-icons/io5";

const AppVersion = await getVersion();
const gh = "https://github.com/aditya-wuw/Copy-Chan"
const yt = "https://www.youtube.com/@NullTeams"

const Settings = () => {
  const [isStartUpEnabled, SetStartUp] = useState<boolean>(true);

  const shortcuts = {
    "open":"Ctrl+Alt+S"
  }

  const StartUpCheck = useCallback(async () => {
    console.log(await isEnabled());
    let isStartUpEnabled = await isEnabled();
    SetStartUp(isStartUpEnabled);
  }, [isEnabled]);

  function HandleStartUp() {
    isStartUpEnabled ? disable() : enable();
    StartUpCheck();
  }

  useEffect(() => {
    StartUpCheck();
  }, []);

  return (
    <main className="px-3">
      <section className="bg-blue-600/20 p-3 rounded-md">
        <div className="flex justify-between items-center">
          <strong>Enable StartUp</strong>
          <SliderButton value={isStartUpEnabled} SetValue={SetStartUp} DoSomthing={HandleStartUp} />
        </div>
        <p className="text-[13px] mt-3  text-gray-300">
          Automatically launches the application as soon as your operating system boots up
        </p>
      </section>
      <section className="mt-3 bg-blue-600/20 p-3 rounded-md">
        <div className="flex justify-between  items-center">
          <h1 >Quick access CopyChan</h1>
          <span className="bg-blue-600/50 p-2 rounded-md text-sm font-mono">{shortcuts.open}</span>
        </div>
        <p className="text-[13px] mt-2 text-gray-300">
          Used to quickly open up the application <br />
          <div className="flex gap-2 items-center bg-red-400 p-1 mt-2 rounded">
            <IoWarningSharp size={20} className="text-yellow-500"/>
            <div className="text-gray-300 pt-1.5">Shortcut may not work on Wayland or other DEs</div>
          </div>
        </p>
      </section>

      <footer>
        <section className="select-none flex gap-2 items-end">
          <img src={"/Copychan.png"} alt="copychan" draggable="false" />
          <div className="pb-6">
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
