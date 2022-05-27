import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const Navbar = () => {
  // console.log(auth.currentUser);
  // console.log(auth);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  // console.log("Navbar Users : ", user);

  const logoutHandler = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-3 h-20 bg-orange-700 shadow-lg border-orange-800 border-b-2">
      <h1 className="text-3xl">
        {" "}
        <Link className="text-orange-300" to="/">
          Messenger+
        </Link>
      </h1>

      <span className="grow" />

      <div>
        <div>
          {user ? (
            <div className="mx-10 text-xl space-x-6 text-white">
              {" "}
              <Link className="hover:text-orange-300" to="/profile">
                Profile
              </Link>
              <button className="text-orange-700 p-2 rounded-lg bg-white transition hover:text-orange-300 hover:bg-orange-700" onClick={logoutHandler}>
                Logout
              </button>{" "}
            </div>
          ) : (
            <div className="mx-10 text-xl space-x-6 text-white">
              <Link className="hover:text-orange-300" to="/register">
                Register
              </Link>
              <Link className="text-orange-700 p-2 rounded-lg bg-white transition hover:text-orange-300 hover:bg-orange-700" to="/login">
                Login
              </Link>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
