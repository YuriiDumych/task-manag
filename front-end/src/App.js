import React, {useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import setAuthToken from './setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authentication';
import jwt_decode from 'jwt-decode';
import Main from './components/Main';
import {connect} from 'react-redux';

function App({logoutUser, setCurrentUser}) {

  useEffect(() => {
    if(localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      setCurrentUser(decoded);
      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime) {
        logoutUser();
      }
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
        <PrivateRoute component={Main} path="/" exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default connect(null, {logoutUser, setCurrentUser})(App);
