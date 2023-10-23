"use client";
import React, {
  useState,
  createContext,
  useContext,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import Input from "../input/input";
import { signInAuthUserWithEmailAndPassword } from "../../utils/filebase/firebase";

type SignInContext = {
  isSignIn: boolean;
  signIn: (email: string, password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

const SignInContext = createContext<SignInContext>({
  isSignIn: false,
  signIn: async (email: string, password: string) => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
});

export function SignInProvider({ children }: { children: React.ReactNode }) {
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(user);
      if (user !== null) {
        setIsSignIn(true);
      }
      return;
    } catch (error) {
      return alert("登入失敗");
    }
  };

  const value = { isSignIn, signIn, email, password, setEmail, setPassword };
  return (
    <SignInContext.Provider value={value}>
      <SignIn>{children}</SignIn>
    </SignInContext.Provider>
  );
}

export function SignIn({ children }: { children: React.ReactNode }) {
  const { isSignIn, signIn, email, password } = useContext(SignInContext);

  return <>{isSignIn ? children : <LoggIn />}</>;
}

export function LoggIn() {
  const { signIn, setEmail, setPassword, email, password } =
    useContext(SignInContext);
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
