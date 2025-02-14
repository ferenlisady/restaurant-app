import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CartItemType } from "../types/types";

export const useCartTotal = () => {
  const { cart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalPrice = cart
    .filter((item: CartItemType) => selectedItems.includes(item.id))
    .reduce((sum: number, item: CartItemType) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0);

  return { selectedItems, toggleSelection, totalPrice };
};
