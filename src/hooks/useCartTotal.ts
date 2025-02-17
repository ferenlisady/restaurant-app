import { useState } from "react";
import { useCart } from "../hooks/useCart";
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
    .reduce((sum: number, item: CartItemType) => sum + (item.price) * (item.quantity), 0);

  return { selectedItems, toggleSelection, totalPrice };
};
