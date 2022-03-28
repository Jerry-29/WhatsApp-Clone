import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIo, { Socket } from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "../style/Join.css";
import { Message } from "./Message";
import sendLogo from "../images/send.png";
import closeIcon from "../images/closeIcon.png";
import InputEmoji from "react-input-emoji";
import useSound from "use-sound";
import notificationAlert from "../images/notification.mp3";
let socket;

const ENDPOINT = "https://whataappclonebackendserver.herokuapp.com/";      // deployed backend server

export const Chat = () => {
  const { name } = useSelector((store) => store.loginReducer);
  const [id, setId] = useState("");
  const [message, setMessage] = useState();
  const [messageData, setmessageData] = useState([]);
  const [play] = useSound(notificationAlert);
  console.log(messageData)
  const handelmessageInp = (e) => {
    setMessage(e.target.value);
  };

  const send = () => {
    if (message.length > 0) {
      socket.emit("message", { message, id });
      // document.getElementById('chatInput').value=''
      setMessage("");
      play();
    }
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setId(socket.id);
      // alert("connected");
    });

    socket.emit("joined", { name });
    socket.on("welcome", (data) => {
      setmessageData([...messageData, data]);
      // Receving data from backend
    //  console.log("3/8", messageData);
      // console.log("38",data);
    });

    socket.on("userJoined", (data) => {
      setmessageData([...messageData, data]);
     // console.log("43", data);
    });

    socket.on("leave", (data) => {
      setmessageData([...messageData,data]);
     // console.log("4llll8", data);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
     // console.log("60", data);
      setmessageData([...messageData, data]);
    });

    return () => {
      socket.off();
    };
  }, [messageData]);

  // console.log(messageData)
  // console.log(name)

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <div>
            <img
              className="userDP"
              src="https://th.bing.com/th/id/R.1a8b91d0ef90966f5f446226f621c157?rik=AhJwQlgQI3b8rw&riu=http%3a%2f%2fwww.watracker.net%2ficon%2fdefault%2fwhatsapp.png&ehk=RG0jaIbjmlDUuDPHC7yZxz5bPtkw6CIZOANs7jwcUyk%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            />
            <h2 className="userNamewithDP">{name}</h2>
          </div>
          <a href="/">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messageData.map((e, i) => {
            return (
              <Message
                key={i}
                user={e.id === id ? "" : e.user}
                message={e.message}
                classs={e.id === id ? "right" : "left"}
              />
            );
          })}
        </ReactScrollToBottom>
        <div className="inputBox">
          <InputEmoji
            value={message}
            onChange={setMessage}
            onEnter={send}
            cleanOnEnter
            placeholder="Type a message"
          />
          {/* <input  onChange={handelmessageInp} onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" /> */}
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};
