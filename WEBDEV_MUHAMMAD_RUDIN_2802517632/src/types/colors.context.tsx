import { createContext, useContext, useState, type ReactNode } from "react";

interface CounterContextType {
  colors: String[];
  setColors: React.Dispatch<React.SetStateAction<String[]>>;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function ColorsProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<String[]>(["#FF8040", "#FFFFFF", "#000000"]);
    
  return (
    <CounterContext.Provider value={{ colors, setColors }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useColors() {
  const ctx = useContext(CounterContext);
  console.log(ctx)
  if (!ctx) {
    throw new Error("Colors must be used inside ColorsProvider");
  }
  return ctx;
}
