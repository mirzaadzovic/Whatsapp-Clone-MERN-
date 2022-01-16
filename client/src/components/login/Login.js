import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { logIn } from "../../reducers/userSlice";
import AuthService from "../../services/AuthService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    const user = await AuthService.getUser();
    console.clear();

    if (user) navigate("/");
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const user = await AuthService.login(username, password);
    console.log(user);

    if (user) {
      dispatch(logIn(user));
      navigate("/");
    } else setPassword("");
  };
  return (
    <div className="login">
      <form className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
          alt="whatsapp-logo"
        />
        <h2>Sign in to WhatsApp</h2>
        <div className="login__containerInput">
          <input
            value={username}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login__containerInput">
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button onClick={(e) => login(e)} type="submit">
          Login
        </Button>

        <Link to="/register">Don't have account? Register</Link>
      </form>
    </div>
  );
};

export default Login;
