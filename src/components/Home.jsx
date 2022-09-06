import React from "react";
import "./home.css";
import { Button } from "@material-ui/core";
import {auth, provider} from '../firebase';
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
const Home = () => {
  const [{}, dispatch] = useStateValue();
  const signIn =()=>{
     auth
      .signInWithPopup(provider)
      .then((result) => {
         dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
         })
      })
      .catch(error => alert(error.message));
  };
  return (
    <div className="Login">
      <div className="login__container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIkCBa9g6byvW9HUnLqTddJNRAeK9HN7gUpKfY2b0KMopIolcc8c7zf0gy-YwfMe979-s&usqp=CAU" alt="was" />

        <div className="login__text">
          <h1>Sign in to whatsApp</h1>
        </div>

        <Button type="sumbit" onClick={signIn}>
          Sign in with google
        </Button>
      </div>
    </div>
  );
};

export default Home;
