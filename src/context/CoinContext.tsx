import { createContext, useState } from "react";

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => void;
  subtractCoins: (amount: number) => void;
}

export const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState(1000); 

  const addCoins = (amount: number) => setCoins(prev => prev + amount);
  const subtractCoins = (amount: number) => setCoins(prev => Math.max(0, prev - amount)); 

  return (
    <CoinContext.Provider value={{ coins, addCoins, subtractCoins }}>
      {children}
    </CoinContext.Provider>
  );
};
