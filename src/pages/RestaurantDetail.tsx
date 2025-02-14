import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, } from "@mui/material";
import { RestaurantType, MenuItemType } from "../types/types";
import MenuCard from "../components/MenuCard";

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);

  useEffect(() => {
    if (!id) return; 

    fetch("/data/restaurants.json")
      .then(res => res.json())
      .then((data: { [key: string]: RestaurantType }) => {
        setRestaurant(data[id]); 
      })
      .catch(error => console.error("Failed to load restaurant:", error));
  }, [id]);

  if (!restaurant) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">{restaurant.name}</Typography>
      <Typography variant="subtitle1" sx={{mb: 5}}>{restaurant.location}</Typography>

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
