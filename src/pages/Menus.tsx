import { useState } from "react";
import { Container } from "@mui/material";
import { MenuItemType, RestaurantType  } from "../types/types";
import MenuPagination  from "../components/MenuPagination";
import SearchBar from "../components/SearchBar";
import { useFetch } from "../hooks/useFetch";

const Menu: React.FC = () => {
  const { data } = useFetch<RestaurantType[]>("/data/restaurants.json");
  const [search, setSearch] = useState("");

  const restaurants: RestaurantType[] = data ?? [];

  const allMenus: MenuItemType[] = (restaurants || []).flatMap((restaurant: RestaurantType) =>
    Object.values(restaurant.menus) 
  );

  const filteredMenu = allMenus.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <SearchBar search={search} onSearchChange={setSearch} />
      <MenuPagination menu={filteredMenu} />
    </Container>
  );
};

export default Menu;
