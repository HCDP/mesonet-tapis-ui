import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from 'tapis-ui/_common';
import Login from '../Login';
import Streams from '../Streams';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <ProtectedRoute path="/hawaii_mesonet">
        <Streams />
      </ProtectedRoute>
      <Redirect path="*" to="/mesonet"></Redirect>
    </Switch>
  );
};

export default Router;
