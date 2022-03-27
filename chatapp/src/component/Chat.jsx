import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIo from "socket.io-client";
import ReactScrollToBottom from 'react-scroll-to-bottom'
import "../style/Join.css";
import { Message } from "./Message";
import sendLogo from "../images/send.png";
import closeIcon from "../images/closeIcon.png";
const ENDPOINT = "http://localhost:6789/";
let socket;
export const Chat = () => {
  const { name } = useSelector((store) => store.loginReducer);
  const [text, setText] = useState("");
  const [id,setId]=useState('')
  const [messageData,setmessageData]=useState([])

  const handelmessageInp = (e) => {
    setText(e.target.value);
  };

  const send = () => {
    socket.emit("message", { text,id });
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
        setId(socket.id)
      alert("connected");
    });

    socket.emit("Joined", { name });
    socket.on("Welcome", (data) => {
        setmessageData([...messageData,data])
      // Receving data from backend
      console.log(data);
    });

    socket.on("UserJoined", (data) => {
        setmessageData([...messageData,data])
      console.log(data);
    });

    socket.on("Leave", (data) => {
        setmessageData([...messageData,data])
      console.log(data);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);


  useEffect(()=>{

    socket.on('SendMessage',(data)=>{
        setmessageData([...messageData,data])
    })

    return ()=>{
    socket.off()
    }
  },[messageData])

  return (
    <div className="chatPage">
    <div className="chatContainer">
        <div className="header">
            <h2>Hey CHAT</h2>
            <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
      <ReactScrollToBottom className="chatBox">
          {
              messageData.map((e,i)=>{
                  return <Message key={e.id} user={e.id===id?'':e.user} message={e.message} classs={e.id===id?'right':"left"} />
              })
          }
      </ReactScrollToBottom> 
      <div className="inputBox">
                    <input onChange={handelmessageInp} onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
  );
};
