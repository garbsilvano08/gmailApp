import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { CLIENT_ID, SCOPES } from "./components/utils";
import Topbar from "./components/Topbar";
import "./App.css";
import SignIn from "./components/SignIn";
import EmailList from "./components/EmailList";
import EmptyEmails from "./components/EmptyEmails";

function GmailApi() {
  const [user, setUser] = useState({});
  const [tokenClient, setTokenClient] = useState({});
  const [tokenResponse, setTokenResponse] = useState({});
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          setTokenResponse(tokenResponse);
        },
      })
    );

    google.accounts.id.prompt();
    // tokenClient.requestAccessToken();
  }, []);

  useEffect(() => {
    if (tokenResponse && tokenResponse.access_token) {
      fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setEmails(data.messages));
    } 
  }, [tokenResponse]);

  const getEmails = () => {
    tokenClient.requestAccessToken({ prompt: "consent" });
  };

  const handleResponse = (response) => {
    setUser(jwt_decode(response.credential));
    document.getElementById("signInCon").hidden = true;
  };

  return (
    <div>
      <SignIn/>
      {user && user.name ? (
        <>
          <Topbar
            setEmails={setEmails}
            user={user}
            getEmails={getEmails}
            setUser={setUser}
          />
          {emails.length > 0 ? (
        <EmailList emails={emails} tokenResponse={tokenResponse}/>
      ) : 
      <EmptyEmails />}
        </>
      ) : null}
      
    </div>
  );
}

export default GmailApi;
