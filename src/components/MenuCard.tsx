import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { MenuItemType } from "../types/types";
import { useCart } from "../context/CartContext";
import RecommendIcon from '@mui/icons-material/Recommend';

interface MenuCardProps {
  item: MenuItemType;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Card>
      <CardMedia 
        component="img" 
        height="300" 
        image={item.image} 
        alt={item.name} 
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">{item.name}</Typography>
          {item.recommended && <RecommendIcon sx={{ color: "#ff9800" }} />}
        </Box>
        <Typography>Price: {item.price} Coins</Typography>
        <Button 
            variant="contained" 
            sx={{ mt: "auto", alignSelf: "flex-end" }} 
            onClick={() => addToCart(item)}
        >Add To Cart</Button>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
