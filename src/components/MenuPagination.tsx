import { useState } from "react";
import { Grid, Pagination, Container, Box } from "@mui/material";
import MenuCard from "./MenuCard";
import { MenuItemType } from "../types/types";

interface MenuPaginationProps {
  menu: MenuItemType[];
}

const ITEMS_PER_PAGE = 6;

const MenuPagination: React.FC<MenuPaginationProps> = ({ menu }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(menu.length / ITEMS_PER_PAGE);
  const paginatedMenu = menu.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={8}>
          {paginatedMenu.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <MenuCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center",  mt: 8 }}>
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

export default MenuPagination;
