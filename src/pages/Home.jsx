import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import MessageForm from "../components/MessageForm";
import Messeges from "../components/Messeges";
import User from "../components/User";
import { auth, db, storage } from "../firebase";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const [img, setImg] = useState();
  const [msgs, setMsgs] = useState([]);
  // console.log(users)

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    // console.log(usersRef);

    const q = query(usersRef, where("uid", "not-in", [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      // console.log(querySnapshot.docs[0].data());

      const data = querySnapshot.docs;
      let arr = [];
      data.map((user) => {
        // setUsers([...users, user.data()])
        arr.push(user.data());
        // console.log(user.data())
      });
      setUsers(arr);
    });
    // return () => unsub();
  }, []);

  const selectUserHandler = async (user) => {
    setChat(user);
    const user2 = user.uid;
    // console.log(user2);
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messeges", id, "chat");
    // console.log(msgsRef);

    const q = query(msgsRef, orderBy("createdAt", "asc"));

    // console.log(q);

    onSnapshot(q, (querySnapshot) => {
      let arr = [];
      // console.log(querySnapshot);
      const data = querySnapshot.docs;

      data.map((doc) => {
        arr.push(doc.data());
      });
      setMsgs(arr);
    });

    console.log(msgs);

    // get last message b/w logged in user and selected user
    // const docSnap = await getDoc(doc(db, "lastMsg", id));
    // // if last message exists and message is from selected user
    // if (docSnap.data() && docSnap.data().from !== user1) {
    //   // update last message doc, set unread to false
    //   await updateDoc(doc(db, "lastMsg", id), { unread: false });
    // }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messeges", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    setText("");
  };

  return (
    <div
      className="relative grid overflow-hidden h-96 w-full"
      style={{ gridTemplateColumns: "1fr 3fr", height: "30rem" }}
    >
      <div className="border-r-2 border-orange-700 overflow-y-auto space-y-8 pb-4">
        {users.map((user) => (
          <User key={user.uid} user={user} onSelectUser={selectUserHandler} />
        ))}
      </div>

      <div className="relative w-full">
        {chat ? (
          <>
            <div className="p-3 text-center text-xl font-bold font-sans text-gray-400 border-b-2 shadow-orange-500 shadow-md border-orange-700">
              {chat.name}
            </div>

            <div className="overflow-y-auto border-2 h-96 border-orange-700">
              {msgs.length ? (
                msgs.map((msg, i) => <Messeges key={i} msg={msg} user1={user1} />)
              ) : (
                <h1>Empty</h1>
              )}
            </div>

            <MessageForm
              handleSubmit={submitHandler}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h2 className="text-2xl text-center text-gray-400 font-bold">
            Select a User to start a conversation
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
