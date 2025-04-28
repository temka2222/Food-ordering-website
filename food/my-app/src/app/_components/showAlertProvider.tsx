"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

export type AlertType = {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
} & PropsWithChildren;

export const ShowAlertContext = createContext<AlertType>({} as AlertType);
export const ShowAlertProvider = ({ children }: PropsWithChildren) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  return (
    <ShowAlertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </ShowAlertContext.Provider>
  );
};
export const useAlert = () => useContext(ShowAlertContext);
