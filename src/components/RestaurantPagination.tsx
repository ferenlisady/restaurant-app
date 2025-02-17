import { Grid, Pagination, Container, Box } from "@mui/material";
import RestaurantCard from "./RestaurantCard";
import { RestaurantType } from "../types/types";
import usePagination from "../hooks/usePagination";

interface RestaurantPaginationProps {
  restaurants: RestaurantType[];
}

const ITEMS_PER_PAGE = 6;

const RestaurantPagination: React.FC<RestaurantPaginationProps> = ({ restaurants }) => {
  const { paginatedItems, page, setPage, totalPages } = usePagination(restaurants, ITEMS_PER_PAGE);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={8}>
          {paginatedItems.map((restaurant) => (
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
            onChange={setPage}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default RestaurantPagination;
