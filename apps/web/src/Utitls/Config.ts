export const AppName = "copy-chan";

export interface VersionsType {
  Version: string;
  Date: string;
  PatchNotes: string;
}

export const Socials = {
  Github: "https://github.com/Smug-Cat-s-Den/Copy-Chan",
  Youtube: "https://www.youtube.com/@smug_cats_den",
  Adi: "https://adi.smgcat.site",
  SmugCat: "https://home.smgcat.site",
};

export const SupportedOs = {
  Windows: "Win",
  MacArm: "macOS (Apple Silicon)",
  MacIntel: "macOS (Intel)",
  MacTar: "macOS (Tarball)",
  LinuxDeb: "Linux (Debian/Ubuntu)",
  LinuxRpm: "Linux (Fedora/RHEL)",
  LinuxAppImage: "Linux (AppImage)",
  LinuxTar: "Linux (ARM64)",
} as const;

export const Versions: VersionsType[] = [
  {
    Version: "0.1.0-preview.7292026",
    Date: "29th Jul 2026",
    PatchNotes: "https://github.com/Smug-Cat-s-Den/Copy-Chan/issues/52",
  },
  {
    Version: "0.0.9",
    Date: "20th Jul 2026",
    PatchNotes: "https://github.com/Smug-Cat-s-Den/Copy-Chan/issues/36",
  },
];
