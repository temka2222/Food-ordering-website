"use client";

import { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";

type SelectedMenuContextType = {
  selectedMenu: string;
  setSelectedMenu: (value: string) => void;
} & PropsWithChildren;

export const SelectedMenuContext = createContext<SelectedMenuContextType>(
  {} as SelectedMenuContextType
);

export const SelectedMenuProvider = ({ children }: PropsWithChildren) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("food-menu");
  return (
    <SelectedMenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </SelectedMenuContext.Provider>
  );
};
export const useSelectedMenu = () => useContext(SelectedMenuContext);
