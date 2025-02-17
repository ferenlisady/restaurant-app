import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Menu from "./pages/Menus";
import Restaurant from "./pages/Restaurants";
import Cart from "./pages/Cart";
import RestaurantDetail from "./pages/RestaurantDetail";
import { CartProvider } from "./context/CartContext";
import { CoinProvider } from "./context/CoinContext";

const App: React.FC = () => {
  return (
    <Router>
      <CoinProvider>
        <CartProvider>
          <Navbar />
          <Box sx={{ py: "50px", minHeight: "100vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurant />} />
              <Route path="/menus" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail/>} />
            </Routes>
          </Box>
          <Footer />
        </CartProvider>
      </CoinProvider>
    </Router>
  );
};

export default App;
