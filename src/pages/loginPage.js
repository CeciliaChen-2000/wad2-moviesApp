import React, { useState } from 'react';
import PageTemplate from "../components/templateAuthPage"
import { auth } from '../firebaseAuth/firebaseConfig';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    form : {
      margin:20,
      padding: 20,
      width: 300,
      fontSize:20
    }
});

const LoginPage = () => {
  const classes = useStyles();
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
            error: 'Success!'
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
      <PageTemplate title="Log in" action={status} />
      <center>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" name="email" onChange={handleChange}  className={classes.form}/><br />
          <input type="password" placeholder="Password" name="password" onChange={handleChange}  className={classes.form}/><br />
          <button type="submit"  className={classes.form}>Log in</button>
          <button type="reset"  className={classes.form}>Reset</button>
        </form>
        <p className={classes.form} width="500">{user.error}</p>
      </center>
    </>
  )
};

export default LoginPage;