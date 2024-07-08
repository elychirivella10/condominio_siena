import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Navigate} from "react-router-dom";
import { getToken } from "helpers/auth/auth";


//component utilizado para tener rutas privadas, si no se encuentra el token, lo redirecciona al login
const PrivateRoute = ({ user, children }) => {
    if (!getToken()) {
      return <Navigate to="/login" replace />;
    }
  
    return <div className="container">{children}</div> ;
  };

export default PrivateRoute;