"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export type UserType = {
  email: string;
  password: string;
  confirmPass: string;
  phoneNumber: string;
  address: string;
  isLoggedIn: boolean;
};
export type UserContextType = {
  user?: UserType;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    phoneNumber: string,
    address: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  UpdateUserAddress: (address: string) => Promise<void>;
} & PropsWithChildren;

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/");
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch {
      toast.error("Нэвтрэх үйлдэл амжилтгүй");
    }
  };
  const UpdateUserAddress = async (address: string) => {
    try {
      const { data } = await axios.put("http://localhost:3001/auth/update", {
        userAddress: address,
      });

      localStorage.setItem("token", data.token);

      toast.success("Хаяг амжилттай шинэчлэгдлээ");
    } catch {
      toast.error("Амжилтгүй");
    }
  };
  const signUp = async (
    email: string,
    password: string,
    phoneNumber: string,
    address: string
  ) => {
    console.log("pass", password);
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signup", {
        email,
        password,
        phoneNumber,
        address,
      });
      console.log("pass", password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("./");
    } catch (error) {
      console.error(error);
      toast.error("Амжилтгүй");
    }
  };
  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3001/auth/me", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, signIn, signOut, signUp, UpdateUserAddress }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
