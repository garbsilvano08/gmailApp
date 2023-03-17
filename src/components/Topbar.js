import React from "react";
import "./styles.css";
import gicon from "./utils/g_icon.png";
const Topbar = ({ user, setEmails, getEmails, setUser }) => {
  console.log(user, "Gab");
  const handleSignOut = () => {
    setUser({});
    setEmails({});
    document.getElementById("signInDiv").hidden = false;
  };
  return (
    <div className="topBar">
      <div id="imgContainer">
        <img alt="" id="profile" src={user.picture} />
        <span>{user.name}</span>
      </div>
      <div id="buttonContainer">
        <button onClick={getEmails}>Get Emails</button>
        <button className="buttonIcon" onClick={handleSignOut}>
          <img id="iconContainer" alt="" src={gicon} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Topbar;
