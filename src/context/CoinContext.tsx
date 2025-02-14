import { createContext, useContext, useState } from "react";

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => void;
  subtractCoins: (amount: number) => void;
}

export const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState(1000); // Default coin balance

  const addCoins = (amount: number) => setCoins(prev => prev + amount);
  const subtractCoins = (amount: number) => setCoins(prev => Math.max(0, prev - amount)); // Ensure coins don't go negative

  return (
    <CoinContext.Provider value={{ coins, addCoins, subtractCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) throw new Error("useCoin must be used within a CoinProvider");
  return context;
};
