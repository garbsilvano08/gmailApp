import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { CLIENT_ID, SCOPES } from "./components/utils";

// Node Js Implementation
// import axios from "axios";
// import { getAllUrlParams } from "./components/utils";

function GmailApi() {
  const [user, setUser] = useState("");
  const [tokenClient, setTokenClient] = useState({});
  const [tokenResponse, setTokenResponse] = useState({});
  // Node Js Implementation
  // const [signInRoute, setSignInRoute] = useState("");

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
          setTokenResponse(tokenResponse)
        },
      })
    );

    google.accounts.id.prompt();
    // tokenClient.requestAccessToken();
  }, []);

  // Node Js Implementation
  // useEffect(() => {
  //   window.open(signInRoute,"_self");
  // }, [signInRoute])

  // useEffect(() => {

  //   const currentUrl = window.location.href;
  //   if(currentUrl.includes('code')){
  //     testAccessToken(currentUrl)
  //   }
  // }, [])

  const getEmails = () => {
    tokenClient.requestAccessToken();
  };

  const handleResponse = (response) => {
    console.log("encoded jwt ID token" + response.credential);
    setUser(jwt_decode(response.credential));
    console.log(jwt_decode(response.credential));
    console.log(tokenClient);
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = () => {
    setUser();
    document.getElementById("signInDiv").hidden = false;
  };

  // Node Js Implementation
  // const testAuth = async () => {
  //   const response = await axios.get("http://localhost:5000/auth/google", {
  //     mode: "no-cors",
  //     withCredentials: false,
  //     headers: {
  //       "Access-Control-Allow-Origin": "http://localhost:3000",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": "true",
  //     },
  //   });

  //   setSignInRoute(response.data);
  // };


  // const testAccessToken = async (currentUrl) => {
  //   console.log(currentUrl, "gab");
  //   const code = getAllUrlParams(currentUrl).code;
  //   const response = await axios.get(
  //     "http://localhost:5000/auth/google/callback",
  //     {
  //       params: { code: `${code}` },
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  // };

  

  return (
    <div>
      <div id="signInDiv"></div>
      {user ? (
        <div>
          <img src={user.picture} /> <h3>{user.name}</h3>
          <button onClick={handleSignOut}>SignOut</button>
          <input type="submit" onClick={getEmails} value="Get Emails" />
        </div>
      ) : null}
      {
        tokenResponse && tokenResponse.access_token ?(
          <>
          <div>tokenResponse</div>
          <h3>{user.name}</h3>
          <h3> Access Token: {tokenResponse.access_token}</h3>
          <h3>Scope: {tokenResponse.scope}</h3>
          </>
        ) : null
      }
      {/* Node implementation */}
      {/* <button onClick={testAuth}>Login</button> */}
    </div>
  );
}

export default GmailApi;
