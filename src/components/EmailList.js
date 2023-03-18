import React from "react";
import Email from "./Email";
import "./styles.css";

const EmailList = ({emails,tokenResponse}) => {
  return (
    <div id='emailListDiv'>
      {emails.map((email, index) => (
        <Email key={index} indexKey={index} email={email} tokenResponse={tokenResponse}/>
      ))}
    </div>
  );
};

export default EmailList;
