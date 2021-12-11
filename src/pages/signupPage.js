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

const SignupPage = () => {
  const classes = useStyles();
  // User State
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    password: '',
    error: '',
  });

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Submit function (Create account)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sign up code here.
    await auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        // Update the nickname
        result.user.updateProfile({
          displayName: user.nickname,
        });

        // URL of my website.
        const myURL = { url: 'http://localhost:3000/' }

        // Send Email Verification and redirect to my website.
        result.user.sendEmailVerification(myURL)
          .then(() => {
            setUser({
              ...user,
              verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
            })
          })
          .catch(error => {
            setUser({
              ...user,
              error: error.message,
            })
          })

        // Sign Out the user.
        auth.signOut();
      }).catch(error => {
        // Update the error
        setUser({
          ...user,
          error: error.message,
        })
      })
  }

  return (
    <>
      <PageTemplate title="Sign up" />
      <center>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nickname" name="nickname" onChange={handleChange} className={classes.form} /><br />
          <input type="text" placeholder="Email" name="email" onChange={handleChange} className={classes.form} /><br />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} className={classes.form} /><br />
          <button type="submit" className={classes.form}>Sign Up</button>
          <button type="reset" className={classes.form}>Reset</button>
        </form>
        <p className={classes.form}>{user.error}</p>
      </center>
    </>
  )
};

export default SignupPage;