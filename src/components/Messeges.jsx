import React, { useEffect, useRef } from "react";
// import Moment from "react-moment";

const Messeges = ({ msg, user1 }) => {
  const scrollRef = useRef();

  // console.log(scrollRef);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  // console.log(msg.createdAt.seconds)
  const time = msg.createdAt.seconds;
  const date = new Date(time * 1000);
  const day = date.getDay();
  const da = date.getDate();
  const month = date.getMonth();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = `${da}-${month},${hours}:${minutes}`;
  //   console.log(formattedTime);

  return (
    <div
      className={`mt-1 p-1 ${msg.from === user1 ? "text-right" : ""}`}
      ref={scrollRef}
    >
      <div
        className={`p-3 inline-block max-w-3xl text-left rounded-md ${
          msg.from === user1 ? "bg-orange-500" : "bg-gray-500"
        }`}
      >
        {msg.media ? (
          <img className="w-full rounded-md" src={msg.media} alt={msg.text} />
        ) : null}
        {msg.text}

        <br />
        <div className="inline-block mt-4 opacity-80">
          {formattedTime}
          {/* <Moment fromNow>{msg.createdAt.toDate()}</Moment> */}
          {/* <Moment format="YYYY/MM/DD">{msg.createdAt.toDate()}</Moment> */}
        </div>
      </div>
    </div>
  );
};

export default Messeges;
