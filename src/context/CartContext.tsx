import { createContext, useReducer, ReactNode } from "react";
import { MenuItemType } from "../types/types";

interface CartItemType extends MenuItemType {
  quantity: number;
  selected: boolean;
}

type CartState = CartItemType[];

type CartAction =
  | { type: "ADD_TO_CART"; payload: MenuItemType }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "TOGGLE_SELECT"; payload: number }
  | { type: "CHECKOUT" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case "ADD_TO_CART":
      newState = state.some(item => item.id === action.payload.id)
        ? state.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state, { ...action.payload, quantity: 1, selected: false }];
      break;

    case "REMOVE_FROM_CART":
      newState = state.filter(item => item.id !== action.payload);
      break;

    case "UPDATE_QUANTITY":
      newState = state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      break;

    case "TOGGLE_SELECT":
      newState = state.map(item =>
        item.id === action.payload ? { ...item, selected: !item.selected } : item
      );
      break;

    case "CHECKOUT":
      newState = state.filter(item => !item.selected);
      break;

    default:
      return state;
  }

  // Update local storage
  if (newState.length > 0) {
    localStorage.setItem("cart", JSON.stringify(newState));
  } else {
    localStorage.removeItem("cart");
  }

  return newState;
};

export const CartContext = createContext<any>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialCart: CartState = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const addToCart = (item: MenuItemType) => dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (id: number) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateQuantity = (id: number, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const toggleSelect = (id: number) => dispatch({ type: "TOGGLE_SELECT", payload: id });
  const getTotalPrice = () => cart.reduce((total, item) => (item.selected ? total + item.price * item.quantity : total), 0);
  const checkout = (coins: number) => {
    if (coins >= getTotalPrice()) {
      dispatch({ type: "CHECKOUT" });
      return true;
    }
    return false;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, toggleSelect, getTotalPrice, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
