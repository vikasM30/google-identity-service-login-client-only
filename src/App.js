import './App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState({})
  const handleCallbackResponse = (response) => { 
    console.log(response)
    const userObj = jwtDecode(response.credential)
    console.log(response.credential)
    console.log(userObj)
    setUser(userObj)
    document.getElementById("signInDiv").hidden = true;
  }

  const handleSignOut = (e) => {
    setUser({})
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )

    google.accounts.id.prompt();
  }, [])
  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
      <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
        }
    </div>
  );
}

export default App;
