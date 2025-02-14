import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { RestaurantType } from "../types/types";
import RestaurantPagination from "../components/RestaurantPagination"; 
import {useFetch} from "../hooks/useFetch"; 
import SearchBar from "../components/SearchBar";

const Restaurants = () => {
  const { data: restaurants, error } = useFetch<RestaurantType[]>("/data/restaurants.json");
  const [search, setSearch] = useState("");

  const filteredRestaurants = (restaurants || []).filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <Typography>Error loading restaurants.</Typography>;
  }

  return (
    <Container>
      <SearchBar search={search} onSearchChange={setSearch} />
      <RestaurantPagination restaurants={filteredRestaurants} />
    </Container>
  );
};

export default Restaurants;
