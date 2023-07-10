import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Nav from "./Nav";
import SignUp from "./SignUp";
import Login from "./Login";
import Wishlist from "./Wishlist";
import Visited from "./Visited";
import MyReviews from "./MyReviews";
import Logout from "./Logout";
import NotFoundPage from "./NotFoundPage";
import ParkDetails from "./ParkDetails";
import ParksByStateList from "./ParksByStateList";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#26b1c6",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/visited" element={<Visited />} />
          <Route path="/reviews/mine" element={<MyReviews />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/park/:code" element={<ParkDetails />} />
          <Route path="/parks/:state" element={<ParksByStateList />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
