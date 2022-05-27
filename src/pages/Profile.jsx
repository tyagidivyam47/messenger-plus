import React from "react";
import img from "../assests/image1.png";
import SvgCamera from "../components/UI/SVG/SvgCamera";

const Profile = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-orange-400 flex w-1/2 h-auto rounded-md shadow-orange-500 shadow-md py-11 pl-10">
        <div className="flex items-center space-x-7">
          <div className="relative mr-5">
            <img
              src={img}
              alt="avatar"
              className="w-full h-full rounded-full transition-all border-2 border-orange-700 hover:opacity-70"
            />

            <div className="absolute top-12 left-12 text-center opacity-0 transition-all hover:opacity-100">
              <div>
                <label htmlFor="photo">
                  <SvgCamera />
                </label>
                <input id="photo" type="file" accept="image/" hidden />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-600">User Name</h3>
            <p className="text-xl">User Email</p>

            <hr />

            <p className="text-sm">Joined on ...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
