
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Product from "../components/Product/ProductList/Product";
import Profile from "../components/Profile/Profile";
import Order from "../components/Order/Order";
import Addproduct from "../components/Product/AddProduct/Addproduct";
import EditProduct from "../components/Product/Edit/EditProduct";

// import other pages...

function App() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addproduct" element={<Addproduct />} />
      <Route path="/Editproduct" element={<EditProduct />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Order" element={<Order />} />
/

      {/* Add more routes here */}

      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
export default App