import React from 'react'
import backGroundImg from './utils/mountain.jpg'
import './styles.css';

const SignIn = () => {
  return (
    <div id="signInCon" >
        <div id="leftCon">
            <p id="title">{"AFFIDAVITS & RFI"}</p>
            <p id="subtitle">{"Looks like your not yet\n connected with your Google Account"}</p>
            <p>{"Lets make your trip fun and simple"}</p>
            <div id="signInDiv"></div>
        </div>
         <div id={"rightCon"}>
            <img id='backgroundImg' alt='' src={backGroundImg}/>
        </div>
    </div>
  )
}

export default SignIn;