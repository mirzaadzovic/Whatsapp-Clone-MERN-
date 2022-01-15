import React from "react";
import "./Register.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="register__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
          alt="whatsapp-logo"
        />
        <h2>Sign up to WhatsApp</h2>
        <div className="register__containerInput">
          <input type="text" placeholder="Email" />
        </div>

        <div className="register__containerInput">
          <input type="text" placeholder="Username" />
        </div>

        <div className="register__containerInput">
          <input type="password" placeholder="Password" />
        </div>

        <div className="register__containerInput">
          <input type="text" placeholder="Avatar URL" />
        </div>

        <Button type="submit">Register</Button>

        <Link to="/login">Already have account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
