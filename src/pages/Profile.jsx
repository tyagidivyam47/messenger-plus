import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import imge from "../assests/image1.png";
import SvgCamera from "../components/UI/SVG/SvgCamera";
import { auth, db, storage } from "../firebase";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  // const authA = auth;
  // console.log(img);
  // console.log(auth);

  // console.log(img);

  const uploadImg = async () => {
    // console.log("auth");
    // console.log("Inside",auth);
    await getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
        // console.log("docsna : ", docSnap.data());
      }
    });
    if (img) {
      // console.log("Inside func");

      const imgRef = ref(
        storage,
        `avatar/${new Date().getTime()} - ${img.name}`
      );
      // const snap = await uploadBytes(imgRef, img);
      try {
        const snap = await uploadBytes(imgRef, img);
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: { url },
          avatarPath: snap.ref.fullPath,
        });

        setImg("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    uploadImg();

  }, [img]);

  const imgChangeHandler = (event) => {
    setImg(event.target.files[0]);
  };

  return user ? (
    <div className="flex justify-center">
      <div className="bg-orange-400 flex w-1/2 h-auto rounded-md shadow-orange-500 shadow-md py-11 pl-10">
        <div className="flex items-center space-x-7">
          <div className="relative mr-5">
            <img
              src={user.avatar? user.avatar.url:imge}
              alt="avatar"
              className="w-28 h-28 rounded-full transition-all border-2 border-orange-700 hover:opacity-70"
            />

            <div className="absolute top-12 left-9 text-center opacity-0 transition-all hover:opacity-100">
              <div>
                <label htmlFor="photo">
                  <SvgCamera />
                </label>
                <input
                  id="photo"
                  type="file"
                  // accept="image/"
                  hidden
                  onChange={imgChangeHandler}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-600">
              {user.name}
            </h3>
            <p className="text-xl">{user.email}</p>

            <hr />

            <p className="text-sm">{user.createdAt.toDate().toDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
