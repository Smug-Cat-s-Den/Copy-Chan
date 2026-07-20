import { TabItem } from "../../types/app.types";
import { CgClose } from "react-icons/cg";
import { BiClipboard } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { SiSymbolab } from "react-icons/si";
import { FaGear } from "react-icons/fa6";
import { getCurrentWindow } from "@tauri-apps/api/window";
type NavProps = {
  ActiveTab: TabItem;
  SetActiveTab: React.Dispatch<React.SetStateAction<TabItem>>;
};

const Nav = ({ ActiveTab, SetActiveTab }: NavProps) => {
  const items: TabItem[] = [
    { label: "Copy", icon: <BiClipboard /> },
    { label: "Symbols", icon: <SiSymbolab /> },
    { label: "Emoji", icon: <BsEmojiSmile /> },
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
          (getCurrentWindow().hide(), SetActiveTab(items[0]));
        }}
      >
        <CgClose />
      </button>
    </nav>
  );
};

export default Nav;
