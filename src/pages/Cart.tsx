import { Container, Typography, Button, List, ListItem, ListItemText, Checkbox, ListItemAvatar, Avatar, Box, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from "../context/CartContext";
import { useCoin } from "../context/CoinContext";
import { CartItemType } from "../types/types";
import { useCartTotal } from "../hooks/useCartTotal"; 

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { coins, subtractCoins } = useCoin();
  const { selectedItems, toggleSelection, totalPrice } = useCartTotal();

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }

    if (coins < totalPrice) {
      alert("Not enough coins!");
      return;
    }

    selectedItems.forEach(id => removeFromCart(id));
    subtractCoins(totalPrice);
    alert("Checkout successful!");
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>Cart</Typography>

      {cart.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <>
          <List>
            {cart.map((item: CartItemType) => (
              <ListItem 
                key={item.id} 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  py: 2 
                }} 
                divider
              >
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelection(item.id)}
                  />

                  <ListItemAvatar>
                    <Avatar 
                      src={item.image} 
                      alt={item.name} 
                      sx={{ 
                        width: { xs: 100, sm: 120, md: 150 },
                        height: { xs: 100, sm: 120, md: 150 },
                        mx: { xs: 2, sm: 3, md: 5 },
                        my: { xs: 0, sm: 1, md: 2 },
                        borderRadius: 3 
                      }} 
                    />
                  </ListItemAvatar>

                  <ListItemText 
                    primary={item.name}
                    secondary={`Price: ${item.price ?? 0} Coins`}
                    sx={{
                      "& .MuiListItemText-primary": { fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.7rem" }, mb:2 }, 
                      "& .MuiListItemText-secondary": { fontSize: { xs: "1.2rem", sm: "1.1rem", md: "1.3rem"}, color: "black" } 
                    }}
                  />
                </Box>

                {/* Quantity & Remove Buttons */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "right", width: "100%" }}>
                  <IconButton 
                      onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity ?? 1) - 1))}
                      color="primary"
                    >
                      <RemoveCircleIcon fontSize="large" />
                    </IconButton>
                    
                    <Typography sx={{ mx: 2 }}>{item.quantity ?? 1}</Typography>
                    
                    <IconButton 
                      onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}
                      color="primary"
                    >
                      <AddCircleIcon fontSize="large" />
                    </IconButton>

                    <IconButton 
                      onClick={() => removeFromCart(item.id)} 
                      color="error"
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          {/* Total Price & Checkout */}
          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Total Price: {totalPrice} Coins</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, px: { xs: 2, sm: 3 } }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
