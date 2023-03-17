import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { CLIENT_ID, SCOPES } from "./components/utils";
import Topbar from "./components/Topbar";
import './App.css'

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
          console.log(tokenResponse);
          setTokenResponse(tokenResponse);
        },
      })
    );

    google.accounts.id.prompt();
    // tokenClient.requestAccessToken();
  }, []);

  useEffect(() => {
    if (tokenResponse && tokenResponse.access_token) {
      console.log("This Happened");
      fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setEmails(data.messages));
    } else {
      console.log("Not Yet");
    }
  }, [tokenResponse]);

  const getEmails = () => {
    tokenClient.requestAccessToken({ prompt: "consent" });
  };

  const handleResponse = (response) => {
    console.log("encoded jwt ID token" + response.credential);
    setUser(jwt_decode(response.credential));
    console.log(jwt_decode(response.credential));
    console.log(tokenClient);
    console.log('true');
    document.getElementById("signInDiv").hidden = true;
  };

  return (
    <div>
      <div id="signInDiv"></div>
      {user && user.name ? (
        <>
          <Topbar setEmails={setEmails} user={user} getEmails={getEmails} setUser={setUser} />
        </>
      ) : null}
      {emails.length > 0 ? (
        <div>
          {emails.map((email) => (
            <div key={email.id}>
              {email.snippet}
              <h3>{email.id}</h3>
              <button
                onClick={() => {
                  fetch(
                    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => console.log("emails details", data));
                }}
              >
                Test
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default GmailApi;
