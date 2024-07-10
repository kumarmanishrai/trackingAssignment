import React from 'react'
import googleLogo from '../assets/google.png'
import '../styles/Login.css'
import '../styles/Common.css'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div className='loginContainer'>
        <div className="card">
            <div className="headerText">
                <p className="majorText">Login to your account</p>
                <p className="minorText">Please sign in to your account </p>
            </div>
            <form className="form">
                <div className="inputContainer">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="" placeholder='Enter email' />

                </div>
                <div className="inputContainer">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="" placeholder='Enter password' />

                </div>
                <div className="forgotPassword">
                    <p className="passwordText"><Link className='link'>Forgot Password?</Link></p>
                </div>
                <button className="submitButton">Sign In</button>
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
                <p className='optionText'>Don't have an account?<Link to='/register' className='link'>Register</Link></p>
            </div>
        </div>
        
    </div>
  )
}

export default Login