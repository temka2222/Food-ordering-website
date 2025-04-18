"use client";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type UserValueType = {
  email: string | "";
  password: string | "";
  confirmPass: string;
  phoneNumber: string | "";
  address: string | "";
  isLoggedIn: boolean;
};
export type UserType = {
  userValues: UserValueType;
  setUserValues: (value: UserValueType) => void;
} & PropsWithChildren;

export const UserContext = createContext<UserType>({} as UserType);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userValues, setUserValues] = useState<UserValueType>({
    email: "",
    password: "",
    confirmPass: "",
    phoneNumber: "",
    address: "",
    isLoggedIn: false,
  });
  return (
    <UserContext.Provider value={{ userValues, setUserValues }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
