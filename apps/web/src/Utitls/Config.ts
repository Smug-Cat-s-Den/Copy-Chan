export const AppName = "copy-chan";
export const BgCover = "https://ik.imagekit.io/3sfckuehxk/app.mp4";

type WindowsDistros = "Windows";
type MacDistros = "MacArm" | "MacIntel" | "MacTar";
type LinuxDistros = "LinuxDeb" | "LinuxRpm" | "LinuxAppImage" | "LinuxTar";

export type AllSupportedOS = WindowsDistros | MacDistros | LinuxDistros;

interface OsDetails {
  Bin: string;
  Url: (Version: string) => string;
}

export interface SupportedOsType {
  Windows: Record<WindowsDistros, OsDetails>;
  Mac: Record<MacDistros, OsDetails>;
  Linux: Record<LinuxDistros, OsDetails>;
}

// data
export const Socials = {
  Github: "https://github.com/Smug-Cat-s-Den/Copy-Chan",
  Youtube: "https://www.youtube.com/@smug_cats_den",
  Adi: "https://adi.smgcat.site",
  AdiGitHub: "https://github.com/aditya-wuw",
  SmugCat: "https://home.smgcat.site",
};

export const SupportedOs: SupportedOsType = {
  Windows: {
    Windows: {
      Bin: "Windows",
      Url: (V: string) => `copy-chan_${V}_x64-setup.exe`,
    },
  },
  Mac: {
    MacArm: {
      Bin: "MacOS (Apple Silicon)",
      Url: (V: string) => `copy-chan_${V}_aarch64.dmg`,
    },
    MacIntel: {
      Bin: "MacOS (Intel)",
      Url: (V: string) => `copy-chan_${V}_x64.dmg`,
    },
    MacTar: {
      Bin: "MacOS (Tarball)",
      Url: (V: string) => `copy-chan_${V}_x64.app.tar.gz`,
    },
  },
  Linux: {
    LinuxDeb: {
      Bin: "Linux (Debian/Ubuntu)",
      Url: (V: string) => `copy-chan_${V}_amd64.deb`,
    },
    LinuxRpm: {
      Bin: "Linux (Fedora/RHEL)",
      Url: (V: string) => `copy-chan-${V}-1.x86_64.rpm`,
    },
    LinuxAppImage: {
      Bin: "Linux (AppImage)",
      Url: (V: string) => `copy-chan_${V}_amd64.AppImage`,
    },
    LinuxTar: {
      Bin: "Linux (ARM64)",
      Url: (V: string) => `copy-chan_${V}_aarch64.app.tar.gz`,
    },
  },
};
