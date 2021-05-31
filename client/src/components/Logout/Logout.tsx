import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import Auth from "../../Auth/Auth";

const Logout = () => {
  useEffect(() => {
    Auth.logout(() => {});
  });
  return <Redirect to="/login" />;
};

export default Logout;
