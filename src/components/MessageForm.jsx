import React from "react";
import Attachment from "./UI/SVG/Attachment";
import Send from "./UI/SVG/Send";

const MessageForm = (props) => {

  // console.log(props);

  const{handleSubmit, text, setText, setImg} = props;

  return (
    <form
      className="absolute bottom-0 left-11 w-full h-8 flex  items-center space-x-8"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="img"
        className="transition-all hover:bg-gray-500 hover:rounded-full hover:p-2 hover:-ml-4 cursor-pointer"
      >
        {<Attachment />}
      </label>
      <input type="file" id="img" accept="image/" onChange={(e) => setImg(e.target.files[0])} hidden={true} />

      <div>
        <input
          style={{ width: "50rem" }}
          className="m-3 outline-none py-1 px-5 rounded-lg"
          type="text"
          value={text}  // eslint-disable-line
          // eslint-disable-line
          onChange={(e) => setText(e.target.value)} // eslint-disable-line
          placeholder="Enter Messege..."
        />
      </div>

      <div>
        <button type="submit" className="bg-orange-700 hover:bg-orange-400 p-1 rounded-full">
          {<Send />}
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
