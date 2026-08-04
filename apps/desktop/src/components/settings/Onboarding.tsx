import { Dispatch, SetStateAction, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaClipboard, FaKeyboard } from "react-icons/fa";
import EnableStartUp from "./EnableStartUp";
import RecordKeyBind from "../RecordKeyBind";
import { keybinds } from "../../Utils/Keybinds";
import { QuickAcces, QuickAccesShortcut } from "../../Utils/RegisterShortcut";
import { AppName, AppVersion, store } from "../../Utils/Utils";
import { MdDone } from "react-icons/md";

interface props {
  setisOnboarded: Dispatch<SetStateAction<boolean>>;
}

const Welcome = () => (
  <div className="animate-fade-up text-left">
    <div className="flex gap-2 items-center mb-3 font-bold">
      <FaClipboard size={30} />
      <span className="text-xl">Your clipboard is ready</span>
    </div>
    <div className="text-[15px] text-gray-300/80 bg-linear-to-r from-blue-500/20 to-blue-800 p-2 rounded-md">
      Welcome to <span className="font-bold">{AppName}</span>, your fast, persistent and
      encrypted clipboard manager. Let's get started by customizing your settings
    </div>
  </div>
);
const Startup = () => (
  <div className="animate-fade-up">
    <div className="flex gap-2 items-center mb-3 font-bold">
      <FaClipboard size={30} />
      <span className="text-xl">Autostart</span>
    </div>
    <div className="text-left mt-4 px-2 bg-linear-to-r from-blue-500/20 to-blue-800 p-2 rounded-md">
      <p className="text-gray-300/80 pb-5">
        Would you like to start <span className="font-bold">{AppName}</span> on startup?
      </p>
      <EnableStartUp />
    </div>
  </div>
);
const CustomKey = () => (
  <div className="animate-fade-in flex flex-col justify-center items-center">
    <div className="flex gap-2 items-center mb-3 font-bold text-left w-full">
      <FaKeyboard size={30} />
      <span className="text-xl">Quick access setup</span>
    </div>
    <div className="text-left w-full text-gray-300/80">
      Would you like to setup a custom key-bind?
    </div>
    <div className="mt-5">
      <RecordKeyBind
        Id={keybinds.QuickAccess.id}
        DefaultKeyBind={QuickAccesShortcut}
        Update={QuickAcces}
      />
    </div>
  </div>
);

const Finish = ({ setisOnboarded }: props) => (
  <button
    className="p-2 bg-blue-600 rounded-md hover:bg-green-500 transition duration-300 ease-in-out"
    onClick={() => {
      store.set("Onboarded", true);
      setisOnboarded(true);
    }}
  >
    <MdDone />
  </button>
);

const Flow = [<Welcome />, <CustomKey />, <Startup />];

export default function Onboarding({ setisOnboarded }: props) {
  const [Current, setCurrent] = useState(0);
  const [CanFinish, setCanFinish] = useState(false);

  // useEffect(() => {
  //   // console.log(Flow.length);
  //   console.log(Current);
  // }, [Current]); //debug

  const GoNext = (isForward: boolean) => {
    let Step = 0;
    Step = isForward ? Current + 1 : Current - 1;
    setCanFinish(Step === Flow.length - 1);
    setCurrent(Step === Flow.length ? Flow.length - 1 : Step < 0 ? 0 : Step);
  };

  return (
    <div data-tauri-drag-region className="px-2 py-5 select-none">
      <div className="text-xl mb-15 flex gap-1 justify-start items-end">
        <img src="Copychan.png" className="w-20" />
        <h1 className="flex flex-col -translate-y-3">
          <span className="text-gray-300">{AppName}</span>
          <span className="text-gray-400 text-sm">{AppVersion}</span>
        </h1>
      </div>
      <div className="w-full h-full px-4 flex flex-col justify-center items-center">
        <div className="h-40 w-full text-center">{Flow[Current]} </div>
        <div className="w-full flex justify-center gap-3">
          {Current > 0 ? (
            <button
              className="p-2 bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300 ease-in-out"
              onClick={() => GoNext(false)}
            >
              <FaChevronLeft />
            </button>
          ) : (
            <div />
          )}
          {CanFinish ? (
            <Finish setisOnboarded={setisOnboarded} />
          ) : (
            <button
              className="p-2 bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300 ease-in-out"
              onClick={() => GoNext(true)}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
