import { useState } from "react";
import { Grid, Pagination, Container, Box } from "@mui/material";
import RestaurantCard from "./RestaurantCard";
import { RestaurantType } from "../types/types";

interface RestaurantPaginationProps {
  restaurants: RestaurantType[];
}

const ITEMS_PER_PAGE = 6;

const RestaurantPagination: React.FC<RestaurantPaginationProps> = ({ restaurants }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(restaurants.length / ITEMS_PER_PAGE);
  const paginatedRestaurants = restaurants.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={8}>
          {paginatedRestaurants.map((restaurant) => (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default RestaurantPagination;
