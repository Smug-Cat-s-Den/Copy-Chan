export type TabItem = {
  label: string;
  icon?: React.ReactNode;
};

export interface history {
  id: string;
  item: string;
  pinned?: boolean;
}

export interface Emojies {
  label: string;
  type: string;
  emoji: string;
  keywords: string[];
}

export type GroupedEmojies = Record<string, Emojies[]>;
