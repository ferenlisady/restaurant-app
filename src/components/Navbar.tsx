import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, Button, ListItemButton, ListItemIcon, ListItemText, Divider, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCoin } from "../hooks/useCoin";

const Navbar: React.FC = () => {
  const { coins, addCoins } = useCoin();
  const [open, setOpen] = useState(false);
  const location = useLocation(); 

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Restaurant", path: "/restaurants", icon: <RestaurantIcon /> },
    { label: "Menu", path: "/menus", icon: <FastfoodIcon /> },
    { label: "Cart", path: "/cart", icon: <ShoppingCartIcon /> },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fafafa", boxShadow: "none", borderBottom: "1px solid #ddd" }}>
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Left Section: Logo & Hamburger Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" }, color: "black" }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
              Restaurant App
            </Typography>
          </Box>

          {/* Center Section: Desktop Menu */}
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
                  opacity: 0.8,
                  textDecoration: "none",
                  borderBottom: location.pathname === item.path ? "2px solid black" : "none",
                  fontWeight: location.pathname === item.path ? "bold" : "normal",
                  "&:hover": { opacity: 1 },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Section: Coins & Add Coin Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "black", fontSize: 18 }}>Coins: {coins}</Typography>
            <IconButton 
              onClick={() => addCoins(100)} 
              sx={{ color: "#1976d2", "&:hover": { color: "#0d47a1", backgroundColor: "transparent" } }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ p: 2, width: 250 }}>
          {/* Close Button */}
          <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>

          <Divider sx={{ mb: 2 }} />

          {/* Menu Items */}
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: 18,
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                borderBottom: location.pathname === item.path ? "2px solid black" : "none",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
