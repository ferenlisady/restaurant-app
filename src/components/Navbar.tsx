import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useCoin } from "../hooks/useCoin";
import { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Navbar: React.FC = () => {
  const { coins, addCoins } = useCoin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Restaurant", path: "/restaurants" },
    { label: "Menu", path: "/menus" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fafafa" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Hamburger Menu & Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" }, color: "black" }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
              Restaurant App
            </Typography>
          </Box>

          {/* Menu Items*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  fontSize: 18,
                  color: "black",
                  textTransform: "none",
                  textDecoration: location.pathname === item.path ? "underline" : "none",
                  "&:hover": { textDecoration: "underline" },
                  backgroundColor: "transparent"
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Coins & Add Coins Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "black", fontSize: 18 }}>Coins: {coins}</Typography>
            <IconButton 
              onClick={() => addCoins(100)} 
              sx={{ 
                color: "#1976d2", 
                "&:hover": { 
                  color: "#0d47a1",
                  backgroundColor: "transparent"
                } 
              }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250, paddingTop: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                textDecoration: location.pathname === item.path ? "underline" : "none", color: "inherit",
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
