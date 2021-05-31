import axios from "axios";
import React, {useState, useContext} from "react";
import {Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Auth from "../../Auth/Auth";
import {AdminContext} from "../../context/AdminContext";
import LoginForm from "./LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const {setAdmin} = useContext(AdminContext);

  // Login function
  const login = async () => {
    const {data} = await axios.get(`http://localhost:3005/login`, {
      params: {email, password},
    });
    if (data.user) {
      Auth.login(() => {
        localStorage.setItem("activeUser", JSON.stringify(data.user));
        if (data.user.role === "admin") setAdmin(data.user);
        history.push("/");
      });
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <Row>
        <Col className="col-12">
          <LoginForm
            setEmail={setEmail}
            setPassword={setPassword}
            login={login}
          />
        </Col>
      </Row>
    </>
  );
};

export default Login;
