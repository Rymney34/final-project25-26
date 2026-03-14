import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext, FieldArray } from 'formik';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import Button from '../../components/Tools/button/button';
import './addMuseum.css'
// import withRouter from '../navigate/navigate';
import { FileUploader } from "react-drag-drop-files";

import axios from 'axios'
import * as Yup from 'yup';
// import Button from '../Tools/button/button';
// import Header from '../header/header';


const API = import.meta.env.VITE_API_URL;;

const addMuseum = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = async (uploadedFile, setFieldValue) => {
        if (file !== null) {
            alert("Please upload only one image");
            return;
        }

        setFile(uploadedFile);

        try {
            const formdata = new FormData();
            formdata.append("firstPageImage", uploadedFile);

            const res = await fetch(`${API}/api/upload/img`, {
                method: "POST",
                body: formdata
            });

            const data = await res.json();
            //console.log(data)
            setUrl(data.url);
            setFieldValue("firstPageImage", data.url);
        } catch (err) {
            console.warn("Upload failed:", err);
        }
    };

    const uploadVideo = async (uploadedFile, setFieldValue) => {
        if (file !== null) {
            alert("Please upload only one Video");
            return;
        }

        setFile(uploadedFile);

        try {
            const formdata = new FormData();
            formdata.append("museumVideo", uploadedFile);

            const res = await fetch("/api/upload/video", {
                method: "POST",
                body: formdata
            });

            const data = await res.json();
            setUrl(data.url);
            setFieldValue("urlImage", data.url);
        } catch (err) {
            console.warn("Upload failed:", err);
        }
    };

    const handleSlideImageUpload = async (imageFile, index, setFieldValue) => {
        
        console.log("gaz")
        try {
            const formdata = new FormData();
            formdata.append("slideImage", imageFile);

            const res = await fetch(`${API}/api/upload/img`, {
                method: "POST",
                body: formdata
            });

            const data = await res.json();
            console.log(data)
            // setUrl(data.url);
            setFieldValue(`slider.${index}.slideImage`, data.url);
        } catch (err) {
            console.warn("Upload failed:", err);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("gaz")
        try {
            const res = await axios.post(`${API}/api/createMuseum`, values);
            console.log("Response:", res.data);

            setSuccess(true);
            setFile(null); 
            resetForm();
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="interfaceWrapper">

          
            {success && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Success!</h3>
                        <p>Your Museum page have been created</p>
                        <button onClick={() => setSuccess(false)}>Close</button>
                    </div>
                </div>
            )}

            <div className='pagetitle' id='pagetitle'>
                <span
                    className="material-symbols--keyboard-return-rounded"
                    onClick={() => navigate(-1)}
                ></span>
                <h2 style={{ margin: "0" }}>Add Museum Form</h2>
            </div>

            <div className='interfaceBlock'>
                <Formik
                    initialValues={{
                        firstPageImage:'',
                        museumTitle: '',
                        openingTime: '',
                        location: '',
                        contactInfo: '',
                        accessiblityInfo: '',
                        map3d: '',
                        slider: [
                            {   
                                slideTitle: '',
                                slideDescription: '',
                                slideImage: ''
                            }
                        ],
                        video: '',
                        virtualTours:[
                            { tour:''}
                        ],
                        map: ''

                        
                        
                    }}
                    validationSchema={Yup.object({
                        firstPageImage: Yup.string().required('Image is Required'),
                        museumTitle:  Yup.string().min(3, "Min 3 characters").required('Required Field'),
                        openingTime: Yup.string().min(4, "Min 3 characters").required('Time Field is Required'),
                        contactInfo: Yup.string().min(3, "Min 3 characters").required('Required Field'),
                        accessiblityInfo: Yup.string().min(3, "Min 3 characters").required('Required Field'),
                        location: Yup.string().min(3, "Min 3 characters").required('Required Field'),
                        map3d: Yup.string().min(3, "Min 3 characters").required('Required to Add GoogleStreetView'),
                        slider: Yup.array().of(
                            Yup.object().shape({ 
                                slideTitle: Yup.string().min(5, "Title too short").required("Slide title is required"),
                                slideDescription: Yup.string().min(10, "Description too short").required("Description is required"),
                                slideImage: Yup.string().required('Image is Required'),
                            })
                        ),
                        video: Yup.string().required('Required Field'),
                        virtualTours: Yup.array().of(
                            Yup.object().shape({
                                tour: Yup.string().required("Link is Required")
                            })
                        ),
                        map: Yup.string().required('Map link is Required'),
                    
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ values,isSubmitting, status, setFieldValue }) => (
                        <Form className='musueumAddForm'>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div className='museumDesc'>
                                    <p>Fill all the details below</p>
                                </div>
                            </div>

                            {status?.error && (
                                <div style={{ color: 'red', marginBottom: '10px' }}>{status.error}</div>
                            )}

                            <div className='museumFields'>
                                <div className='leftFormBlock'>
                                    <label>Main Museum Image</label>
                                    <FileUploader
                                        multiple={false}
                                        handleChange={(f) => handleChange(f, setFieldValue)}
                                        name="firstPageImage"
                                        types={["jpg", "jpeg", "png", "webp"]}
                                        label={"Upload image right here"}
                                        fileOrFiles={file}
                                    />{console.log(url)}
                                    <ErrorMessage className="error" name="firstPageImage" component="div" />
                                    <label>Museum Title</label>
                                    <Field type="text" name="museumTitle" placeholder="Museum Title" />
                                    <ErrorMessage className="error" name="museumTitle" component="div" />
                                    <label>Opening Time</label>
                                    <Field type="text" name="openingTime" placeholder="Opening Hours" />
                                    <ErrorMessage className="error" name="openingTime" component="div" />
                                    <label>Location</label>
                                    <Field type="text" name="location" placeholder="Location" />
                                    <ErrorMessage className="error" name="location" component="div" />
                                    <label>Add Google Steet View String</label>
                                    <Field type="text" name="map3d" placeholder="add link of the googleStreet View" />
                                    <ErrorMessage className="error" name="map3d" component="div" />
                                    <label>Contact Information</label>
                                    <Field type="text" name="contactInfo" placeholder="Contact Information" />
                                    <ErrorMessage className="error" name="contactInfo" component="div" />
                                    <label>Accessability Information</label>
                                    <Field type="text" name="accessiblityInfo" placeholder="Accessability Information" />
                                    <ErrorMessage className="error" name="accessiblityInfo" component="div" />
                                    <label>Add 1 Video</label>
                                    <Field type="text" name="video" placeholder="add link to video of the mususeum" />
                                    <ErrorMessage className="error" name="video" component="div" />
                                    <label>Add Map link</label>
                                    <Field type="text" name="map" placeholder="add link to the location on the map of the mususeum" />
                                    <ErrorMessage className="error" name="map" component="div" />

                                    <div
                                        className="virtual-tours-section"
                                        style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}
                                    >
                                    
                                        <label style={{ fontWeight: "bold" }}>Virtual Tours</label>

                                        <FieldArray name="virtualTours">
                                            
                                            {({ push, remove }) => (
                                                <div>
                                                   
                                                    {values.virtualTours.map((vt, index) => (
                                                        <div
                                                            key={index}
                                                            className="tour-item"
                                                            style={{
                                                                marginBottom: "10px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "10px",
                                                            }}
                                                        >
                                                          
                                                            <div style={{ flex: 1 }}>
                                                                
                                                                <Field
                                                                    name={`virtualTours.${index}.tour`}
                                                                    placeholder="Paste virtual tour link here (e.g. Matterport or 360 view)"
                                                                />
                                                                <ErrorMessage
                                                                    className="error"
                                                                    name={`virtualTours.${index}.tour`}
                                                                    component="div"
                                                                />
                                                            </div>
                                                            {values.virtualTours.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => remove(index)}
                                                                    style={{
                                                                        color: "red",
                                                                        background: "none",
                                                                        border: "none",
                                                                        cursor: "pointer",
                                                                        fontSize: "1.2rem",
                                                                    }}
                                                                >
                                                                    
                                                                    <span className="material-symbols--delete-outline">x</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="add-tour-btn"
                                                        onClick={() => push({ tour: "" })}
                                                        style={{
                                                            marginTop: "5px",
                                                            fontSize: "0.8rem",
                                                            padding: "5px 10px",
                                                            backgroundColor: "var(--red-color)",
                                                            border: "1px solid #999",
                                                            borderRadius: "15px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        
                                                        + Add Another Tour Link
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>

                                    
                                </div>

                                <div className='rightFormBlock'>

                                    <FieldArray name="slider"> 
                                        {({ push, remove}) => (
                                            <div className='slides-container'>
                                                <h3>Slides - You Can add multiple slides </h3>

                                                {values.slider && values.slider.length > 0 ? (
                                                    values.slider.map((slide, index) => (
                                                        <div key={index} className="slide-item-card" style={{border: "1px solid white", borderRadius:"25px", padding: 15}}>
                                                            <div style={{ displat: "flex", justifyContent: "space-between" }}>
                                                                <button
                                                                    type='button'
                                                                    className='remove-btn'
                                                                    onClick={() => remove(index)}
                                                                    style={{ margin: "20px 0px 20px 0px", color: "red" }}
                                                                >
                                                                    Remove
                                                                </button>
                                                                <h4>Slide {index + 1}</h4>
                                                                
                                                            </div>

                                                            <div className='field-group'>
                                                                <label>Slide Title</label>

                                                                <Field type="text" name={`slider.${index}.slideTitle`} placeholder="Slide title" />
                                                                <ErrorMessage className="error" name={`slider.${index}.slideTitle`} component="div" />
                                                                
                                                            </div>

                                                            <div className='field-group'>
                                                                <label>Slide Description</label>

                                                                <Field type="text" name={`slider.${index}.slideDescription`} placeholder="Slide Describtion" />
                                                                <ErrorMessage className="error" name={`slider.${index}.slideDescription`} component="div" />

                                                            </div>

                                                            <div className='field-group'>
                                                                <label>Slide Image</label>

                                                                <FileUploader
                                                                    multiple={false}
                                                                    handleChange={(f) => handleSlideImageUpload(f,index, setFieldValue)}
                                                                    name={`slider.${index}.slideImage`}
                                                                    types={["jpg", "jpeg", "png", "webp"]}
                                                                    label={"Upload image right here"}
                                                                    fileOrFiles={values.slider[index].slideImage || null}
                                                                />
                                                                <ErrorMessage className="error" name={`slider.${index}.slideImage`} component="div" />

                                                            </div>
                                                        </div>
                                                    ))
                                                ) : null }

                                                <button
                                                    type="button"
                                                    className='add-slide-btn'
                                                    onClick={()=> push({slideTitle: "", slideDesription: '', slideImage: ''})}
                                                    style={{ color: "green", margin: "20px 0px 20px 0"}}
                                                > 
                                                    Add new   
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>

                                    <Button type="submit" text="Submit" disabled={isSubmitting} style={{ backgroundColor: "#56D55D", color: "white" }} />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default addMuseum;