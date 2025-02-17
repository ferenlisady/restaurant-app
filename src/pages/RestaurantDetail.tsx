import { useParams } from "react-router-dom";
import { Container, Typography, Grid, } from "@mui/material";
import { RestaurantType, MenuItemType } from "../types/types";
import {useFetch} from "../hooks/useFetch"; 
import MenuCard from "../components/MenuCard";

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  const { data: restaurants } = useFetch<{ [key: string]: RestaurantType }>("/data/restaurants.json");

  if (!restaurants || !id || !restaurants[id]) {
    return <Typography>Loading...</Typography>;
  }

  const restaurant = restaurants[id];

  return (
    <Container>
      <Typography variant="h4">{restaurant.name}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>{restaurant.location}</Typography>

      <Grid container spacing={8}>
        {Object.values(restaurant.menus).map((menuItem: MenuItemType) => (
          <Grid item key={menuItem.id} xs={12} sm={6} md={4}>
            <MenuCard item={menuItem} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RestaurantDetail;
