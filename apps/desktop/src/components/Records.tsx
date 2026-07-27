import { VscPinned } from "react-icons/vsc";
import { history } from "../types/app.types";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { forwardRef, useState } from "react";
import { convertFileSrc } from "@tauri-apps/api/core";

interface props {
  i: history;
  index: number;
  HandleCopy: (content: string, is_image: boolean) => void;
  PinHistory: (id: string) => void;
  removeHistory: (id: string, content?: String, isImage?: boolean) => void;
}
const Records = forwardRef<HTMLButtonElement, props>(
  ({ i, HandleCopy, PinHistory, removeHistory }: props, ref) => {
    const [RetryCount, setRetryCount] = useState(0);
    const HandleError = (path: String) => {
      if (RetryCount < 10) {
        setRetryCount((prev) => prev + 1);
      } else {
        console.error(`Failed to fetch path: ${path}`);
      }
    };

    return (
      <div key={i.id} className="flex justify-between m-2 items-start">
        <button
          ref={ref}
          className="p-2 outline-2 outline-blue-600/50 mt-2 focus:outline-1.5 focus:outline-blue-500 text-left bg-linear-to-r from-blue-500/20 from via-blue-700 to-blue-500/20  hover:bg-blue-500 hover:via-blue-500  hover:text-white h-20 w-83 line-clamp-4 overflow-hidden rounded-md cursor-pointer"
          onClick={() => (i.is_image ? HandleCopy(i.item, true) : HandleCopy(i.item, false))}
        >
          {i.is_image ? (
            <img
              src={`${convertFileSrc(i.item.trim())}?=${RetryCount}`}
              alt={i.item.slice(0, -10)}
              onLoad={() => setRetryCount(0)}
              onError={() => HandleError(i.item)}
              className="p-0.75 object-cover bg-blue-600 rounded-md"
            />
          ) : (
            i.item
          )}
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
          <button
            className="h-fit rounded-md"
            onClick={() => removeHistory(i.id, i.item, i.is_image)}
          >
            <RiDeleteBin6Fill size={17} className="hover:text-red-500 hover:scale-130" />
          </button>
        </div>
      </div>
    );
  },
);

export default Records;
