import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

function Login({user, setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const postUserData = (body) => {
    return fetch(`http://localhost:5000/api/token`, {
      'method': 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(responseJson => setUser(responseJson.uid))
    .catch(error => console.log(error))
  }

  const loginUser = () => {
    postUserData({email, password})
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if (user) history.replace("/listSchedule");
  }, [user])

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => loginUser()}
        >
          Login
        </button>
        <button className="login__btn login__google">
          Login with Google
        </button>
        <div className="login_text">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className="login_text">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
