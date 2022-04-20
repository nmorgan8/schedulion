import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";

function Register({user, setUser, URL_VARIABLE}) {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const postUserData = (body) => {
    const URL = URL_VARIABLE + 'api/signup'
    return fetch(URL, {
      'method': 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(responseJson => setUser(responseJson.userID))
    .catch(error => console.log(error))
  }

  const registerUser = () => {
    postUserData({email, password, firstName})
    setFirstName('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    console.log(user)
    if (user) history.replace("/listSchedule");
  }, [user])

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="register__btn"
          onClick={() => registerUser()}
        >
          Register
        </button>
        <div className="register_text">
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;