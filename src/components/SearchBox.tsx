import { BiSearch } from "react-icons/bi";
import { Emojies } from "../types/app.types";
import { Dispatch, SetStateAction } from "react";

interface props {
  Searchdata: Emojies[];
  SetFiltered: Dispatch<SetStateAction<Emojies[]>>;
}

const SearchBox = ({ Searchdata, SetFiltered }: props) => {
  let data = Searchdata
  const handlesearch = (SearchTerms: string) => {
    const terms = SearchTerms.toLowerCase().trim();
    if (!terms) return SetFiltered(Searchdata);
    const f = data.filter((i) => {
      const EmojiMatch = i.emoji.toLowerCase().trim().includes(terms);
      const LabelMatch = i.label.toLowerCase().trim().includes(terms);
      const typeMatch = i.type.toLowerCase().includes(terms);
      const KeywordsMatch = i.keywords.some((k) => k.toLowerCase().trim().includes(terms));
      return KeywordsMatch || EmojiMatch || LabelMatch || typeMatch;
    });
    SetFiltered(f);
  };

  return (
    <div>
      <div className="flex justify-between gap-3">
        <form className="dark:bg-blue-600/20 bg-blue-400/20 backdrop-blur-md flex items-center w-full px-2 rounded-md h-8">
          <BiSearch className="hover:scale-115" />
          <input
            placeholder="search"
            type="text"
            onChange={(e) => {
              handlesearch(e.target.value);
            }}
            className="outline-0  p-1 pl-2 w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
