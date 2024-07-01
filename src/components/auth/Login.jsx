import React, { useState, useEffect } from 'react';
// import { Avatar, Grid, Paper, TextField, Checkbox, FormControlLabel, Button, Typography, Link, Fade } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
// import loginStyles from './LoginStyles';
import { login } from '../../api calls/ConnectApiData'; 
import './Login.scss'
import Loadingboard from './../../assets/loadingboard.svg'; // Import the SVG file
import  GrowshootLogo  from "./../../assets/growshoot_logo-icon.svg";
import  userLogo  from "./../../assets/username.svg";
import  passwordLogo  from "./../../assets/password.svg";

// import  Password  from "./../../assests/password.svg";
import { toast } from "react-toastify";
// import styled from "styled-components";
import { LinearProgress} from "@mui/material";

const Login = (props) => {
    const { t, i18n } = useTranslation();

    const usernameLabel = t('usernameLabel');
    const passwordLabel = t('passwordLabel');
    const rememberMeLabel = t('rememberMeLabel');
    const loginButtonLabel = t('loginButtonLabel');
    const forgotPasswordLabel = t('forgotPasswordLabel');
    const gsDocsUser = t('gsDocsUser');
    const gsDocsAdminLabel = t('gsDocsAdminLabel');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
      username: null,
      password: null,
    });
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        try{
            const response=await login(username,password);
            if(response.status==='0'){ 
                toast.success("login successful");
                setTimeout(() => {
                  isAdmin==true ?   window.location.href = "/setting" :  window.location.href = "/home";
                }, 1000); // Simulate a 3-second delay
            }else{
                toast.error('login failed');

            }
        }catch(err){
            toast.error('Error occurred while logging in:',err);
            setLoading(false);

        }
    };

    useEffect(() => {
      setIsAdmin(props.isAdmin == true ? true : false )
    }, [props.isAdmin]);


    return ( <>
    
          <div className={`main ${ i18n.language === 'ar' ? 'rtl' : 'ltr'}`} >
            <div className="side-board">
              <img  src={Loadingboard} alt="Logo" />

            </div>
            <div className="test2">
              <div className="login-form">
                <div className="login-form-logo">
                  <img className="logo-icon" src={GrowshootLogo} alt="Logo" />
                  {isAdmin==true ?  <span className="textLogo">{gsDocsAdminLabel}</span> :  <span className="textLogo">{gsDocsUser}</span>  }
                </div>
                <div className="login-details">
                  <form onSubmit={handleSubmit}>
                    <div className="input-flow">
                      <img src={userLogo} alt="Logo" className='icon-user-password'/>
                      <div className="input-group inputForm">
                        <input
                          type="text"
                          className={`${
                            errors.username ? "error " : ""
                          } OpenSans-Regular`}
                          id="username"
                          value={username}
                          placeholder={usernameLabel}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              username: null,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="errorOuterDiv">
                      {errors.username && (
                        <span className="error-message-login OpenSans-Regular">
                          {errors.username}
                        </span>
                      )}
                    </div>
                    <div className="input-flow">
                      <img src={passwordLogo} alt="Logo" className='icon-user-password' />

                      <div className="input-group inputForm">
                        <input
                          type="password"
                          id="password"
                          value={password}
                          placeholder={passwordLabel}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              password: null,
                            }));
                          }}
                          className={`${
                            errors.password ? "error " : ""
                          } OpenSans-Regular`}
                        />
                      </div>
                    </div>
                    <div className="errorOuterDiv">
                      {errors.password && (
                        <span className="error-message-login OpenSans-Regular">
                          {errors.password}
                        </span>
                      )}
                    </div>
                   
                    <button type="submit" disabled={loading} className={loading ? 'OpenSans-Regular disable-color' : 'OpenSans-Regular enable-color'}>
                    
                    {loginButtonLabel} 
                    </button>
                    { loading && <LinearProgress thickness={1} /> }

                  </form>
                  <div>
                    <div className='margin-top-16px'>
            <input
              type="checkbox"
              checked={rememberMe}
              className='check-box'
              onChange={(e) => setRememberMe(e.target.checked)}
            />
           <span className='remember-me'>  { rememberMeLabel}</span>
          </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        
      </>);
};

export default Login;
