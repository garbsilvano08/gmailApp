import React from "react";
import "./styles.css";
import gicon from "./utils/g_icon.png";
const Topbar = ({ user, setEmails, getEmails, setUser }) => {
  const handleSignOut = () => {
    setUser({});
    setEmails({});
    document.getElementById("signInCon").hidden = false;
  };
  return (
    <div className="topBar">
      
      <img alt="" id="profile" src={user.picture} />
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
