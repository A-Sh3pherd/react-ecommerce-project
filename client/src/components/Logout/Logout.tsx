import React, {useContext, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Auth from "../../Auth/Auth";
import {AdminContext} from "../../context/AdminContext";

const Logout = () => {
  const {setAdmin} = useContext(AdminContext);

  useEffect(() => {
    Auth.logout(() => {
      setAdmin(null);
    });
  });
  return <Redirect to="/login" />;
};

export default Logout;
