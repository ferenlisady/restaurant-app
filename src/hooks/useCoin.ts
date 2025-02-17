import { useContext } from "react";
import { CoinContext } from "../context/CoinContext";

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) throw new Error("useCoin must be used within a CoinProvider");
  return context;
};