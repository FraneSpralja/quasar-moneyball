export interface Entries {
  id: string;
  name: string;
  amount: number;
  paid?: boolean;
}

export interface EssentialLinkProps {
  title: string;
  navTo?: string;
  icon?: string;
};

export interface Meta {
  totalCount: number;
}

export interface Settings {
  promptToDelete: boolean;
  showRunningBalance: boolean;
  currencySymbol: string;
  darkMode: boolean | 'auto';
}