import './Register.css'
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import { BrowserRouter as Router, Routes, Route, useNavigate,Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import logo from '../../../resources/img/logo.png'
import axios from 'axios'
import * as Yup from 'yup';


const API_ENDPOINT = "/api/register"; 
const API = import.meta.env.VITE_API_URL || "";

    const Register = () => {
      

        const [showPassword, setShowPassword] = useState(false);
        const [showSuccessModal, setShowSuccessModal] = useState(false);
        const navigate = useNavigate();


        const handleSubmit = async (values, { setSubmitting, setStatus }) => {

            try {
                console.log("Handle Register")
                console.log(values);
                const res = await axios.post(`${API}${API_ENDPOINT}`, values);

                // navigate("/");
                if(res.status === 201 || res.status === 200){
                    setShowSuccessModal(true);
                    // navigate("/login");
                }

            } catch (error) {
                console.error(error);
                setStatus({error: error.response?.data?.message || 'Registration failed try again!'})
            } finally {

            }

            
        };

        const togglePassword = () => {
            setShowPassword((prev) => !prev)
        }

        const handleCloseSuccessModal = () =>{
            setShowSuccessModal(false);
            navigate("/login");
        }

        return(
            <div className="regWarpper">
                {showSuccessModal && (
                    <div className='modalOverlay'>
                        <div className='modalBox'>
                            <h2>
                                Registration Successful
                            </h2>
                            <p>Your account has been created successfully</p>
                            <button onClick={handleCloseSuccessModal}>
                                Ok
                            </button>
                        </div>
                    </div>
                )}
                <div className='regFormInner'>
                    <Formik
                        initialValues={{ 
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',

                        }}
                        
                            validationSchema = {Yup.object({
                                firstName: Yup.string()
                                            .required('Required Field'),
                                lastName: Yup.string()
                                    .required('Required Field'),
                                email: Yup.string()
                                            .email('Wrong Email address')
                                            .required('Required Field'),
                                password: Yup.string()
                                            .min(7, "Minium 7 characters")
                                            .test("contains-number", "Password must include a number", (value) => {
                                                return /\d/.test(value); // Ensures at least one number exists
                                            })
                                            .required('Required Field'),
                            })}
                            onSubmit={handleSubmit}
                    >

                        {({ isSubmitting, status}) => (
                            <Form className='regForm'>
                                
                                
                                {status && status.error && (
                                    <div style={{ color: 'red', marginBottom: '10px' }}>
                                        {status.error}
                                    </div>
                                )}
                                <div className='regFormTitle'>
                                    <img tabindex="0" className="logoClassLogin" alt='logo' src={logo} />
                                    <h3>Account SignUp</h3>
                                </div>
                                    
                                <Field type="text" name="firstName" id="firstName" placeHolder="First Name" />
                                    <ErrorMessage name="firstName" component="div" />
                                <Field type="text" name="lastName" id="lastName" placeHolder="Last Name" />
                                    <ErrorMessage name="lastName" component="div" />
                                <Field type="email" name="email" id="email" placeHolder="Email" />
                                    <ErrorMessage name="email" component="div" />
                                    
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
                                    <ErrorMessage name="password" component="div" />
                                
                                <button type="submit" disabled={isSubmitting}>
                                    Register
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }

export default Register;