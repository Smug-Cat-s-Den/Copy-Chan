import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { useCallback, useEffect, useState } from "react";
import { SliderButton } from "../SliderButton";

export default function EnableStartUp() {
  const [isStartUpEnabled, SetStartUp] = useState<boolean>(true);
  /*
    Startup check
  */
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
    <div className="flex justify-between items-center">
      <span className="font-semibold">Enable StartUp</span>
      <SliderButton value={isStartUpEnabled} SetValue={SetStartUp} DoSomthing={HandleStartUp} />
    </div>
  );
}
