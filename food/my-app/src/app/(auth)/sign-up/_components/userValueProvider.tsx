"use client";
import { api, setAuthToken } from "@/app/axios";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import {
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
  step: number;
  setStep: (value: number) => void;
} & PropsWithChildren;

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/signin", {
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
      await api.put("/auth/update", { userAddress: address });
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
      const { data } = await api.post("/auth/signup", {
        email,
        password,
        phoneNumber,
        address,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("./");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;

        if (message === "Имэйл бүртгэлтэй байна") {
          toast.error("Имэйл бүртгэлтэй байна");
          setStep(step - 1);
        } else {
          toast.error(message || "Бүртгэл амжилтгүй боллоо");
        }
      } else {
        toast.error("Сервертэй холбогдож чадсангүй");
      }
    }
  };
  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("./");
  };

  const getUser = async () => {
    // const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);

      // localStorage.removeItem("token");
      // setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signUp,
        UpdateUserAddress,
        loading,
        step,
        setStep,
      }}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <Loader className="animate-spin w-20 h-20 text-gray-500" />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
