import { getVersion } from "@tauri-apps/api/app";
import { BsYoutube } from "react-icons/bs";
import { GrGithub } from "react-icons/gr";

const AppVersion = await getVersion();
const gh = "https://github.com/Smug-Cat-s-Den/Copy-Chan";
const yt = "https://www.youtube.com/@smug_cats_den";

export default function Footer() {

  return (
    <footer>
      <div className="text-[15px] mt-3  text-gray-300 px-2 font-bold">Copy Chan - Smol Clipboard manager :3</div>
      <div className="text-[12px]  text-gray-300 px-2">This project is maintained and developed by Adi under Smug Cat's. Thank you for using Copy Chan :)</div>
      <section className="select-none mt-2 flex gap-2 items-end">
        <div className="bg-white rounded-full mb-1">
          <img src={"/SmugCat.png"} alt="copychan" draggable="false" width={70} />
        </div>
        <img src={"/Copychan.png"} alt="copychan" draggable="false" width={80} />
        <div className="pb-2">
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
  );
}
