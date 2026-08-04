export interface VersionsType {
  Version: string;
  Date: string;
  PatchNotes: string | undefined;
}

export const Versions: VersionsType[] = [
  {
    Version: "0.1.0-preview.7292026",
    Date: "29th Jul 2026",
    PatchNotes: "https://github.com/Smug-Cat-s-Den/Copy-Chan/issues/57",
  },
  {
    Version: "0.0.9",
    Date: "20th Jul 2026",
    PatchNotes: "https://github.com/Smug-Cat-s-Den/Copy-Chan/issues/36",
  },
];
