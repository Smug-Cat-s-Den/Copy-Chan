import { VscPinned } from "react-icons/vsc";
import { history } from "../types/app.types";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface props {
  i: history;
  HandleCopy: (content: string) => void;
  PinHistory: (id: string) => void;
  removeHistory: (id: string) => void;
}
const Records = ({ i, HandleCopy, PinHistory, removeHistory }: props) => {
  return (
    <div key={i.id} className="flex justify-between m-2 items-start">
      <button
        className="p-2 outline-2 outline-blue-600/50 mt-2 focus:outline-3 focus:outline-blue-500 text-left bg-linear-to-r from-blue-500/20 from via-blue-700 to-blue-500/20  hover:bg-blue-500 hover:via-blue-500  hover:text-white h-20 w-83 line-clamp-4 overflow-hidden rounded-md cursor-pointer"
        onClick={() => HandleCopy(i.item)}
      >
        {i.item}
      </button>
      <div className="flex flex-col items-center gap-4 mt-2 h-20">
        <button className="h-fit rounded-md" onClick={() => PinHistory(i.id)}>
          <VscPinned
            size={i.pinned ? 25 : 20}
            className={`${
              !i.pinned ? "hover:fill-yellow-400 " : "hover:fill-red-500 fill-amber-300"
            } hover:scale-130 `}
          />
        </button>
        <button className="h-fit rounded-md" onClick={() => removeHistory(i.id)}>
          <RiDeleteBin6Fill size={17} className="hover:text-red-500 hover:scale-130" />
        </button>
      </div>
    </div>
  );
};

export default Records;
