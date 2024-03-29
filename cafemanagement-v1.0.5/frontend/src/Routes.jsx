import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard/index";
import OrderList from "./pages/OrderList/index";
import AddTable from "./pages/AddTable/index";
import TableList from "./pages/TableList/index";
import TableId from "./pages/TableId/index";
import Customer from "./pages/Customer/index";
import Review from "./pages/Review/index";
import AddMenu from "./pages/AddMenu/index";
import MenuList from "./pages/MenuList/index";
import Categories from "./pages/Categories/index";
import Sidebar1 from "components/Sidebar1";
import AddOrder from "./pages/Orderonline"
import CheckoutPage from "./pages/Checkout/index";
import Signup from './pages/Signup/index'
import Login from './pages/Login/index'

const ProjectRoutes = () => {
  const location = useLocation();

  // Check if the current location is the signup page
  const isSignupPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex">
      {/* Conditionally render the sidebar based on the route */}
      {!isSignupPage && !isLoginPage && <Sidebar1 />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="orderlist" element={<OrderList />} />
          <Route path="order" element={<AddOrder />} />
          <Route path="addtable" element={<AddTable />} />
          <Route path="tablelist" element={<TableList />} />
          <Route path="tableid" element={<TableId />} />
          <Route path="customer" element={<Customer />} />
          <Route path="review" element={<Review />} />
          <Route path="addmenu" element={<AddMenu />} />
          <Route path="menulist" element={<MenuList />} />
          <Route path="categories" element={<Categories />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProjectRoutes;
