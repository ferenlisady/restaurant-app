export interface MenuItemType  {
    id: number;
    name: string;
    price: number;
    image: string;
    recommended: boolean;
  }
  
  export interface RestaurantType {
    id: number;
    name: string;
    location: string;
    image: string;
    menus: { [key: string]: MenuItemType  };
  }
  
  export interface CartItemType extends MenuItemType  {
    quantity: number;
    selected: boolean;
  }