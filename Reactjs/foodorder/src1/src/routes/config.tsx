import { ReactNode } from 'react';

export type RouteType = {
  element: ReactNode;
  state: string;
  index?: boolean;
  path?: string;
  icon?: any;
  child?: RouteType[];
  sidebarProps?: {
    displayText: string;
    icon?: ReactNode;
  };
};
