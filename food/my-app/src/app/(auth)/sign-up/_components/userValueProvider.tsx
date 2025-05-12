"use client";
import axios from "axios";
import { Loader } from "lucide-react";
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
  _id: string;
  email: string;
  password: string;
  confirmPass: string;
  phoneNumber: string;
  address: string;
  role: "admin" | "user";
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
  loading: boolean;
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  const UpdateUserAddress = async (address: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await axios.put(
        "http://localhost:3001/auth/update",
        { userAddress: address },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      getUser();
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
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signup", {
        email,
        password,
        phoneNumber,
        address,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("./");
    } catch (error) {
      console.error(error);
      toast.error("Амжилтгүй! хэрэглэгч бүртгэлтэй байна");
      router.push("sign-up");
    }
  };
  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("./");
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3001/auth/me", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("asdasdas", data);

      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, signIn, signOut, signUp, UpdateUserAddress, loading }}
    >
      {loading ? <Loader className="animate-spin" /> : children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
