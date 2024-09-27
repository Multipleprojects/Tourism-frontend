import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/User_Login";
import User_Register from "../pages/User_Register";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import SearchResultList from "../pages/SearchResultList";
import Thankyou from "../pages/Thankyou";
import Admin_Dashboard from "../components/Admin/Admin Dashboard/Admin_Dashboard";
import Create_Tour from "../components/Admin/Admin_Tour/Create_Tour";
import Get_Tour from "../components/Admin/Admin_Tour/Get_Tour";
import Admin_Login from '../pages/Admin_Login';
import Company_Login from '../pages/Company_Login';
import Company_Register from "../pages/Company_Register";
import Create_TourSchedule from "../components/Admin/Admin_Tour/Create_Tourschedule";
import Tour_Gallery from "../components/Admin/Admin_Tour/Tour_Gallery";
import Create_Touroffer from "../components/Admin/Admin_Tour/Create_Touroffer";
import Mediia from "../pages/Mediia";
import Noteligible from "../pages/Noteligible";

const Routers = () => {
  return (
    <Routes>
      {/* Home */}
      {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      <Route path="/home" element={<Home />} />
      
      {/* Authentication */}
      
      <Route path="/" element={<Home />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<User_Register />} />
      <Route path="/company/login" element={<Company_Login />} />
      <Route path="/company/register" element={<Company_Register />} />
      <Route path="/admin/login" element={<Admin_Login />} />
      <Route path="/not-eligible" element={<Noteligible />} />
      {/* Tours */}
      <Route path="/thank-you" element={<Thankyou />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/tours/gallery" element={<Tour_Gallery />} />
     
      
      {/* Admin Dashboard */}
      <Route path="/admin/dashboard" element={<Admin_Dashboard />} />
      <Route path="/admin/dashboard/create/tour" element={<Create_Tour />} />
      <Route path="/admin/dashboard/get/tour" element={<Get_Tour />} />
      <Route path="/admin/dashboard/create/tour" element={<Create_Tour />} />
      <Route path="/admin/dashboard/create/tour/schedule" element={<Create_TourSchedule />} />
      <Route path="/admin/dashboard/create/tour/offer" element={<Create_Touroffer />} />

      <Route path="/admin/dashboard/create/tour/media" element={<Mediia />} />
    </Routes>
  );
};

export default Routers;
