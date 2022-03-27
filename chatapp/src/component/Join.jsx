
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { getLoggedUserName } from '../Redux/action'
import '../style/Join.css'
import logo from '../images/logo.png'
export const Join=()=>{
//  const {user}=useSelector(store=>store.loginReducer) 
 const dispatch=useDispatch()
 const [text,setText]=useState('')
  const handelInput=(e)=>{
     setText(e.target.value)
  }
  const handelOnClick=()=>{
        dispatch(getLoggedUserName(text))
  }
    return <div className="JoinPage">
    <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>C CHAT</h1>
          <input type='text' onChange={handelInput}  id="joinInput"/>
          <br />
        <Link to={`/Chat`}><button disabled={text.length<3} onClick={handelOnClick} className='joinbtn'>Login</button></Link>
      </div>
        </div>
}
