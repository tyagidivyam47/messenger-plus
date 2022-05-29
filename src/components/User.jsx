import React from "react";
import img from "../assests/image1.png";

const User = (props) => {
  console.log(props);

  return (
    <div className="px-3 py-1 cursor-pointer m-4 rounded-2xl transition-all shadow-xl hover:bg-orange-400">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={props.user.avatar ? props.user.avatar.url : img}
            alt="avatars"
            className={`w-16 h-16 rounded-full transition-all border-2 ${props.user.isOnline?"border-green-600":"border-red-600"} hover:opacity-70`}
          />

          <h3 className="group font-serif text-gray-200 text-lg font-thin hover:font-bold">
            {props.user.name}
          </h3>
          {/* <img src={props.user.avatar.url} alt="avatars" /> */}
        </div>
        <div className={`h-3 w-3 rounded-full ${props.user.isOnline?"bg-green-600":"bg-red-600"}`} />
          
        {/* </div> */}
      </div>
    </div>
  );
};

export default User;
