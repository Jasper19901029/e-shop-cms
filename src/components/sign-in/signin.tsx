"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import Input from "../input/input";
import { signInAuthUserWithEmailAndPassword } from "@/utils/firebase/firebase";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export function SignIn({ children }: { children: React.ReactNode }) {
  const store = useStore(useSignInStore, (state) => state);
  return <>{store?.isSignIn ? children : <LoggIn />}</>;
}

export function LoggIn() {
  const store = useStore(useSignInStore, (state) => state);
  if (store === undefined) return null;
  const { signIn, email, password, setEmail, setPassword } = store;
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center space-y-4">
      <Input
        id="email"
        htmlFor="email"
        label="帳號"
        name="email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        htmlFor="password"
        label="密碼"
        name="password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="pl-[35.69px]" onClick={() => signIn(email, password)}>
        登入
      </button>
    </div>
  );
}

type SignInStore = {
  isSignIn: boolean;
  signIn: (email: string, password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

const signIn = async (email: string, password: string) => {
  const user = await signInAuthUserWithEmailAndPassword(email, password);
  if (user) {
    return true;
  }
};

export const useSignInStore = create<SignInStore>()(
  devtools(
    persist(
      (set) => ({
        isSignIn: false,
        signIn: async (email: string, password: string) => {
          const user = await signIn(email, password);
          if (user) {
            set({ isSignIn: true });
          }
        },
        email: "",
        setEmail: (email) => set({ email }),
        password: "",
        setPassword: (password) => set({ password }),
      }),
      {
        name: "signIn-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
