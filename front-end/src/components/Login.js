import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../actions/authentication';

const Login = ({errors, auth, loginUser, history}) => {

  const [user, setUser] = useState({});
  const handleSubmit = event => {
    event.preventDefault();
    loginUser(user);
  }
  const handleChange = event => {
    setUser(Object.assign({}, user, {[event.target.name]: event.target.value}))
  }
  useEffect(() => {
    if(auth.isAuthenticated) {
      history.push('/')
    }   
  })
  return(
    <div className="login-container">
      <div className="text-center login-box">
        <h3>Login to Task Manager</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              className="form-control" 
              type="email" 
              name="email" 
              placeholder="Email" 
              required
              onChange={handleChange}
              />
              {errors.email && 
                <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input 
              className="form-control" 
              type="password" 
              name="password" 
              placeholder="Password" 
              required
              onChange={handleChange}
              />
              {errors.password && 
                <p className="text-danger">{errors.password}</p>}                  
          </div>
          <button type="submit" className="btn-lg form-control bg-success text-white">Login</button>
        </form>
      </div>
      <div className="my-4 p-3 bg-white rounded">
        Don't have an account?  <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {loginUser})(Login);