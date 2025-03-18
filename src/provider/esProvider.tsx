"use client";
import Es from "@/class/es";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Contextの型を定義
interface EsContextType {
  es: Es;
  setEs: Dispatch<SetStateAction<Es>>;
}

// 初期値を設定してContextを作成
export const MyContext = createContext<EsContextType>({
  es: {
    questId: "",
    userId: "",
    theme: "",
    answer: "",
    length: 0,
  },
  setEs: () => {},
});

// Providerコンポーネントを作成
export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [es, setEs] = useState<Es>({
    questId: "",
    userId: "",
    theme: "",
    answer: "",
    length: 0,
  });

  return (
    <MyContext.Provider value={{ es, setEs }}>{children}</MyContext.Provider>
  );
};
