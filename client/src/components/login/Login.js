import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { logIn } from "../../reducers/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await axios
      .get("/auth/user")
      .catch((err) => console.log(err));
    if (response.status === 200) navigate("/");
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        return res.data.user;
      })
      .catch((err) => err);

    if (response?.id) {
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
