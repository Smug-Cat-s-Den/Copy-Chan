import { invoke } from "@tauri-apps/api/core";
import { TabItem } from "../../types/app.types";
import { CgClose } from "react-icons/cg";
import { BiClipboard } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { SiSymbolab } from "react-icons/si";
import { FaGear } from "react-icons/fa6";
type NavProps = {
  ActiveTab: TabItem;
  SetActiveTab: React.Dispatch<React.SetStateAction<TabItem>>;
};

const Nav = ({ ActiveTab, SetActiveTab }: NavProps) => {
  const items: TabItem[] = [
    { label: "copy", icon: <BiClipboard /> },
    { label: "symbols", icon: <SiSymbolab /> },
    { label: "emoji", icon: <BsEmojiSmile /> },
    { label: "Settings", icon: <FaGear /> },
  ];

  return (
    <nav
      data-tauri-drag-region
      className="sticky z-10 flex justify-between items-center w-full pt-2"
    >
      <div className="grid grid-cols-4 gap-4 place-items-center group ml-3">
        {items.map((i, index) => (
          <button
            key={index}
            onClick={() => SetActiveTab(i)}
            className={`dark:hover:bg-blue-800 hover:bg-blue-300 ${
              ActiveTab.label === i.label && "dark:bg-blue-800 bg-blue-300"
            } p-2 w-full rounded-xl mb-2`}
          >
            {i.icon}
          </button>
        ))}
      </div>
      <button
        className="mb-3 hover:bg-red-500 mr-2 p-2 rounded-md"
        onClick={() => {
          (invoke("hide_window"), SetActiveTab(items[0]));
        }}
      >
        <CgClose />
      </button>
    </nav>
  );
};

export default Nav;
