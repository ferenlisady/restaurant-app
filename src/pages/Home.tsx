import { Container, Typography, Box, CardMedia } from "@mui/material";
import MenuPagination from "../components/MenuPagination";
import { useFetch } from "../hooks/useFetch"; 
import { RestaurantType, MenuItemType } from "../types/types";

const Home = () => {
  const { data: restaurants } = useFetch<RestaurantType[]>("/data/restaurants.json");

  const recommendedMenus: MenuItemType[] = (restaurants ?? []).flatMap((restaurant) =>
    Object.values(restaurant.menus).filter((menu) => menu.recommended)
  );

  return (
    <Container>
      {/* Banner Section */}
      <Box sx={{ position: "relative", display: "inline-block", width: "100%" }}>
        <CardMedia component="img" height="300" image="/images/banner.jpg" alt="banner" sx={{borderRadius: "20px"}}/>
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          Welcome to Restaurant App
        </Typography>
      </Box>

      {/* Recommended Menus Section */}
      <Typography variant="h4" sx={{ my: 5, textAlign: "center" }}>
        Recommended Menus
      </Typography>

      <MenuPagination menu={recommendedMenus} />
    </Container>
  );
};

export default Home;
