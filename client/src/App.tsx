import React, {useState, useMemo} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Logout from "./components/Logout/Logout";
import Register from "./pages/Register/Register";
import Order from "./pages/Order/Order";
import {AdminContext} from "./context/AdminContext";

function App() {
  const [admin, setAdmin] = useState(null);
  const adminProvider = useMemo(() => ({admin, setAdmin}), [admin, setAdmin]);

  return (
    <Router>
      <Switch>
        <AdminContext.Provider value={adminProvider}>
          <ProtectedRoute exact path="/" Component={Home} />
          <ProtectedRoute exact path="/order" Component={Order} />

          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/logout" exact component={Logout} />
        </AdminContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
