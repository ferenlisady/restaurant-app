import { useContext } from "react";
import { CoinContext } from "../context/CoinContext";

export const useCoin = () => {
  return useContext(CoinContext);
};
