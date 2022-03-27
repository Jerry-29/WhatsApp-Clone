import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getLoggedUserName } from "../Redux/action";
import "../style/Join.css";
import logo from "../images/logo.png";
export const Join = () => {
  //  const {user}=useSelector(store=>store.loginReducer)
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handelInput = (e) => {
    setText(e.target.value);
  };
  const handelOnClick = () => {
    dispatch(getLoggedUserName(text));
  };
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img
          style={{
            width: "100px",
            margin: "50px",
          }}
          src="https://i1.wp.com/multarte.com.br/wp-content/uploads/2018/11/whatsapp-logo-icone-fundo-transparente.png?fit=1527%2C1563&ssl=1"
          alt="logo"
        />
        <h1>WhatsApp</h1>
        <h4>Enter your Name</h4>
        <input
          style={{
            padding: "3px",
            width: "300px",
          }}
          type="text"
          onChange={handelInput}
          id="joinInput"
        />
        <br />
        <Link to={`/Chat`}>
          <button
            style={{
              margin: "20px",
            }}
            disabled={text.length < 3}
            onClick={handelOnClick}
            className="joinbtn"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};
