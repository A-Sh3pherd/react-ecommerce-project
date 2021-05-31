import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import Auth from "../../Auth/Auth";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/login')
  }, [history]);

  return <div></div>;
};

export default Logout;
