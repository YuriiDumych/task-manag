import React, {useState} from 'react';
import {registerUser} from '../actions/authentication';
import {connect} from 'react-redux';

const Register = ({errors, registerUser, history}) => {

  const [user, setUser] = useState({});
  const handleSubmit = event => {
    event.preventDefault();
    registerUser(user, history)
  }
  const handleChange = event => {
    setUser(Object.assign({}, user, {[event.target.name]: event.target.value}))
  }
  return(
    <div className="login-container">
      <div className="text-center login-box">
        <h3>Create your account</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              className="form-control" 
              type="text" 
              name="first_name" 
              placeholder="First name" 
              required
              onChange={handleChange}
              />
          </div>
          <div className="form-group">
            <input 
              className="form-control" 
              type="text" 
              name="last_name" 
              placeholder="Last name" 
              required
              onChange={handleChange}
            />
          </div>
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
              <p className="text-danger">{errors.email}</p>
            }
          </div>
          <div className="form-group">
            <input 
              className="form-control" 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              minLength="6"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input 
              className="form-control" 
              type="password" 
              name="confirm_password" 
              placeholder="Confirm password" 
              required 
              minLength="6" 
              onChange={handleChange}
            />
          {errors.confirm_password && 
            <p className="text-danger">{errors.confirm_password}</p>
          }
          </div>
          <button type="submit" className="btn-lg form-control bg-primary text-white">Register</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    errors: state.errors
  }
}


export default connect(mapStateToProps, {registerUser})(Register);