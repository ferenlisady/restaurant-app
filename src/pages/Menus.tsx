import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { MenuItemType, RestaurantType  } from "../types/types";
import MenuPagination  from "../components/MenuPagination";
import SearchBar from "../components/SearchBar";
import { useFetch } from "../hooks/useFetch";

const Menu: React.FC = () => {
  const { data, error } = useFetch<RestaurantType[]>("/data/restaurants.json");
  const [search, setSearch] = useState("");

  if (error) {
    return <Typography>Error loading menus.</Typography>;
  }

  const restaurants: RestaurantType[] = data ?? [];

  const allMenus: MenuItemType[] = (restaurants || []).flatMap((restaurant: RestaurantType) =>
    Object.values(restaurant.menus) // Convert menu object into an array
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
