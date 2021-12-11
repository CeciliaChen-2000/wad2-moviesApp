import React, { useState } from 'react';
import PageTemplate from "../components/templateAuthPage"

import { auth } from '../firebaseAuth/firebaseConfig';


const LoginPage = () => {
  // User State
  // const [user, setUser] = useState({
  //   email: '',
  //   password: '',
  //   error: '',
  // });
  const [user, setUser] = useState({});
  const [status, setStatus] = useState("logout");

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Submit function (Log in user)
  const handleSubmit = e => {
    e.preventDefault();
    // Log in code here.
    auth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        if (!result.user.emailVerified) {
          setUser({
            ...user,
            error: 'Please verify your email before to continue',
          })
          setStatus("logout");
          auth.signOut();
        }else{
          setUser({
            ...user,
            error: 'Success'
          })
          setStatus("login");
        }
      })
      .catch(error => {
        // Update the error
        setUser({
          ...user,
          error: error.message,
        })
      })
  }

  return (
      <>
          <PageTemplate title="Log in" action={status}/>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Email" name="email" onChange={handleChange} /><br />
              <input type="password" placeholder="Password" name="password" onChange={handleChange} /><br />
              <button type="submit">Log in</button>
          </form>
          {user.error && <h4>{user.error}</h4>}
      </>
  )
};

export default LoginPage;