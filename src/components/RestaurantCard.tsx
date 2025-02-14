import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RestaurantType } from "../types/types";

interface RestaurantCardProps {
  restaurant: RestaurantType;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/restaurant/${restaurant.id}`)} sx={{ cursor: "pointer" }}>
        <CardMedia 
            component="img" 
            height="300" 
            image={restaurant.image} 
            alt={restaurant.name}
        />
        <CardContent>
            <Typography variant="h6">{restaurant.name}</Typography>
        </CardContent>
    </Card>
  );
};

export default RestaurantCard;
