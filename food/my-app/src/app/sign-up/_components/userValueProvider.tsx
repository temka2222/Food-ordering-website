"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { UserType } from "../page";

export const UserContext = createContext<UserType>({} as UserType);

export const UserProvider = ({
  userValues,
  setUserValues,
  children,
}: UserType) => {
  return (
    <UserContext.Provider value={{ userValues, setUserValues }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
