import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { logIn } from "../../reducers/userSlice";
import Cookie from "universal-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookie();

  const login = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data.token);
        cookies.set("wap", res.data.token, {
          path: "/",
          httpOnly: true,
        });
        cookies.set("dsfsdf", res.data.token, { httpOnly: true, path: "/" });
        return res.data.user;
      })
      .catch((err) => err);
    console.log(response);
    if (response.id) {
      dispatch(logIn(Object(response)));
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
