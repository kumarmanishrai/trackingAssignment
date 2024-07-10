import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Register.css'
import '../styles/Common.css'
import googleLogo from '../assets/google.png'

const Register = () => {
  return (
    <div className='registerContainer'>
        <div className="card">
            <div className="headerText">
                <p className="majorText">Create your new account</p>
                <p className="minorText">Create an account to start looking for the food you like</p>
            </div>
            <form className="form">
                <div className="inputContainer">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="" placeholder='Enter email' />

                </div>
                <div className="inputContainer">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="" placeholder='Enter username' />
                </div>
                <div className="inputContainer">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="" placeholder='Enter password' />

                </div>
                <div className="policyContainer">
                    <input type="checkbox" name="checkbox" className='checkbox' />
                    <p className="policyText">I Agree with <Link className='link'>Terms of Services</Link> and <Link className='link'>Privacy Policy</Link></p>
                </div>
                <button className="submitButton">Register</button>
            </form>
            <div class="separator">
                <div className="horizontalLine"></div>
                <span class="seperatorText">Or sign in with</span>
                <div className="horizontalLine"></div>
            </div>
            <div className="btnOutline">
                <button><img src={googleLogo} alt="" /></button>
            </div>
            <div className="option">
                <p className='optionText'>Have an account?<Link to='/login' className='link'>Sign In</Link></p>
            </div>
        </div>
        
    </div>
  )
}

export default Register