import { memo, useMemo, useState } from "react";
import { HandleCopy, ParseAndGroupEmoji } from "../../Utils/Utils";
import SearchBox from "../SearchBox";
import { Emojies } from "../../types/app.types";
import { Virtuoso } from "react-virtuoso";

interface props {
  emotes: Emojies[];
  title: string;
}

interface ElementProps {
  index: number;
  i: Emojies;
  sections: string;
}

const EmojiItem = memo(({ index, i }: ElementProps) => {
  return (
    <div
      key={index + i.label}
      className="p-2 bg-blue-600/30 relative group rounded-md"
      onClick={() => HandleCopy(i.emoji, false)}
    >
      <span>{i.emoji}</span>
      {/*Disable tip it looks ugly UwU*/}
      {/*<span
        className={`opacity-0 text-[12px] pointer-events-none group-hover:opacity-100 absolute ${
          sections === "Quaso" ? "bottom-10" : "bottom-11"
        } left-0 right-10 bg-blue-500  text-white flex justify-center items-center z-5 rounded-md p-1 w-full line-clamp-1 break-all`}
      >
        {i.label}
      </span>*/}
    </div>
  );
});

const EmojiPicker = ({ emotes, title }: props) => {
  const [Filtered, SetFiltered] = useState<Emojies[]>(emotes);
  const symbol = useMemo(() => ParseAndGroupEmoji(Filtered), [Filtered]);

  return (
    <main className="mt-2 mx-2 relative">
      <div>
        <div className="h-70">
          <nav className="sticky top-0 z-10">
            <SearchBox Searchdata={emotes} SetFiltered={SetFiltered} />
            <div className="h-3 dark:dark:bg-blue-900 bg-white" />
          </nav>
          {/*needed wrapper for virualization*/}
          {Filtered.length > 0 && symbol ? (
            <Virtuoso
              style={{ height: "100%" }}
              // totalCount={Object.entries(symbol).length}
              data={Object.entries(symbol)}
              itemContent={(_, [sections, items]) => (
                <div key={sections} className="animate-fade-up">
                  <h1 className="text-xs m-1 mt-5 text-gray-400">{sections}</h1>
                  <div
                    className={`animate-fade-in  ${
                      sections === "Quaso" ? "grid grid-cols-5 text-[10px]" : "grid grid-cols-7"
                    } grid-rows-1 gap-2`}
                  >
                    {items.map((i, index) => (
                      <EmojiItem i={i} index={index} sections={sections} key={index} />
                    ))}
                  </div>
                </div>
              )}
            />
          ) : (
            <div className="mt-1 flex justify-center text-gray-400">found nothing in {title} :(</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default memo(EmojiPicker);
