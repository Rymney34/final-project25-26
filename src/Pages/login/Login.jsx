
import React, {useState, useEffect} from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import { BrowserRouter as Router, Routes, Route,Link, useNavigate } from "react-router-dom";
import logo from '../../../resources/img/logo.png'
import "./Login.css"

// import togglePasswordVisibility from '../Tools/toggleButton/tooglePassword';


import * as Yup from 'yup';
const API_ENDPOINT = "/api/login"; 

const API = import.meta.env.VITE_API_URL || "";

console.log("API URL:", import.meta.env.VITE_API_URL);
  //to clear error from the validation from db
    const ClearErrorOnChange = () => {
      const { status, setStatus, values } = useFormikContext();

      useEffect(() => {
          if (status && status.error) {
            setStatus(null);
          }
      }, [values, setStatus]);

      return null;
    };

  const Login = () => {

    
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
      setShowPassword((prev) => !prev)
    }

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
          const response = await fetch(`${API_ENDPOINT}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
              credentials: 'include',
          });
          

          const data = await response.json();

          if (response.ok && data.accessToken && data.message === "Login successful") {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.accessToken);
            // localStorage.setItem("refreshToken", data.refreshToken);
            setStatus({ success: "Login successful!" });
            // console.log("Logged in user:", data.user);
            navigate("/home");
          } else {
            setStatus({ error: data.message || "Invalid credentials" });
            
          }
        } catch (error) {
          console.error("Error:", error);
          setStatus({ error: "Server Error" });
        } finally {
          setSubmitting(false);
        }
      };


      return (
        <div id="formLogin"> 
              <div>
                  <Formik
                      initialValues={{ email: '', password: '' }}
                      validationSchema = {Yup.object({
                          email: Yup.string()
                                      .email('Wrong Email address')
                                      .required('Required Field'),
                          password: Yup.string()
                                      .min(7, "Minium 7 chars")
                                      .required('Required Field'),
                      })}
                      onSubmit={handleSubmit}
                  >
                              {({ isSubmitting, status}) => (
                          <Form id="loginForm" >
                            <ClearErrorOnChange/>
                              <div id="loginf" className="loginForm" >
                                  <div className='loginTitle'>
                                      <img tabindex="0" className="logoClassLogin" alt='logo' src={logo} />
                                      <h3>Login</h3>
                                  </div>
                              
                              {status && status.error && (
                                  <div style={{ color: 'red', marginBottom: '10px' }}>
                                      {status.error}
                                  </div>
                              )}
                              <Field type="email" name="email" id="email" placeHolder="Email" />
                              <ErrorMessage className="errors" name="email" component="div" />
                              <div id="passwordInput">
                                
                              </div>
                              <div className="password-container">
                                  <Field
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                  />
                                  <span className="eye-icon" onClick={togglePassword}>
                                    {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>}
                                  </span>
                                </div>
                                <ErrorMessage className="errors" name="password" component="div" />
                              {/* {console.log("Gazoz")} */}
                              <button type="submit" disabled={isSubmitting}>
                                  Login
                              </button>
                                <span style={{marginTop: "20px",
                                              display: "flex", 
                                              alignItems: "center", 
                                              justifyContent:"center", 
                                              flexDirection: "column"
                                            }}>
                                <Link to="/register">
                                  Register
                                </Link> if you dont have an acoount</span>
                              </div>  
                              
                          </Form>
                          
                      )}
                      
                      
                  </Formik>
                </div>
            </div>
      )
    }


export default Login;