import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoWarningSharp } from "react-icons/io5";

interface WarningProps {
  // propName: type;
}

const warn_id = "warn-shortcut";

export default function Warning({}: WarningProps) {
  const [Open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let CanWarn = localStorage.getItem(warn_id);
    setOpen(CanWarn === "false");
  }, []);

  return (
    <div className={`${!Open ? "none" : "hidden"}  gap-2 items-start bg-red-400 p-1 mt-2 rounded`}>
      <div className="flex justify-between w-full">
        <div />
        <CgClose
          className="p-1 rounded-md bg-red-600/20"
          size={20}
          onClick={() => {
            localStorage.setItem(warn_id, "false");
            setOpen(!Open);
          }}
        />
      </div>
      <div className="flex content-center">
        <div className="py-2">
          <IoWarningSharp size={50} className="text-yellow-500 pb-3.5" />
        </div>
        <div className="text-white pt-1.5">
          If you are on Linux and shortcuts do not trigger, please switch to an X11 session for full
          compatibility.
        </div>
      </div>
    </div>
  );
}
