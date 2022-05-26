import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
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
    // console.log("User :", user);
  });

  // const updateUserStore = async () =>{
  //   await onAuthStateChanged(auth, (user) =>{
  //     userActions.addUser(user);
  //     console.log("User :", user);
  //   })
  // }

  // useEffect(()=>{
  //   updateUserStore();
  // },[])

  return (
    <div className="space-y-28">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
