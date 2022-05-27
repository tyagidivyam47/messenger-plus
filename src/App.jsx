import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/register/Register";
import { userActions } from "./store/user-slice";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    dispatch(userActions.addUser(user));
  });

  const user = useSelector((state) => state.user.user);

  return (
    <div className="space-y-28">
      <Navbar />
      <Routes>
        {!user && <Route path="/" exact element={<Navigate to="/login" />} />}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
