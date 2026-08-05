export interface VersionsType {
  Version: string;
  Date: string;
  PatchNotes: string | undefined;
}

export const Versions: VersionsType[] = [
  {
    Version: "1.0.805",
    Date: "5th Aug 2026",
    PatchNotes: "https://github.com/Smug-Cat-s-Den/Copy-Chan/issues/57",
  },
  {
    Version: "0.1.0-preview.8012026",
    Date: "2nd Aug 2026",
    PatchNotes: "https://github.com/Smug-Cat-s-Den/Copy-Chan/issues/57",
  },
  {
    Version: "0.0.9",
    Date: "20th Jul 2026",
    PatchNotes: "https://github.com/Smug-Cat-s-Den/Copy-Chan/issues/36",
  },
];
