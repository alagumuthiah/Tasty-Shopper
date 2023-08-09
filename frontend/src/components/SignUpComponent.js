import { TextField, Button, Typography } from "@mui/material";
import { Link, Navigate } from 'react-router-dom';
import React from 'react';
import { fetchUser } from "../utils/fetchData";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/session';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignUpComponent() {
    const userInfo = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    const defaultValues = {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(3, 'Username has to be atleast 3 characters')
                .max(40, 'Username has to be less than 40 characters')
                .required('Username is required'),
            firstName: Yup.string()
                .min(4, 'Firstname has to be least 4 characters long')
                .max(40, 'firstname has to less than 40 chacters')
                .required('Firstname is a required field'),
            lastName: Yup.string()
                .min(4, 'Lastname has to be least 4 characters long')
                .max(40, 'Lastname has to less than 40 chacters')
                .required('Lastname is a required field'),
            password: Yup.string()
                .min(5, 'Password has to be atleast 5 characters')
                .max(40, 'Password has to less than 40 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .required('confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            email: Yup.string()
                .email('Invalid email Address')
                .required('Email is Required')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.setSubmitting({ isSubmitting: true });
        }
    })

    React.useEffect(() => {
        if (formik.isSubmitting && !formik.isValidating) {
            const response = fetchUser('/users/signup', formik.values);
            console.log(response); //error handling needs to be implemented
            response
                .then((userData) => {
                    if (userData.data.hasOwnProperty("userName")) {
                        alert('Sign up successful');
                        let token = userData.headers['access-token'];
                        sessionStorage.setItem('access-token', token);
                        alert('Signup successful');
                        dispatch(login(userData.data));
                    } else {
                        alert(` Error: ${userData.data.Error}`);
                    }
                })
                .catch((error) => {
                    alert(`Error:${error}`);
                })
            formik.handleReset();
        }
    }, [formik.isSubmitting]);

    if (userInfo.isLogged) {
        return <Navigate to="/myrecipes" replace="true" />
    }
    return (
        <form className="form-section" onSubmit={formik.handleSubmit}>
            <Typography>New User? Please Sign Up</Typography>
            <div className="spaced-element">
                <TextField
                    id="userName"
                    type="text"
                    name="userName"
                    value={formik.values.userName}
                    label="UserName"
                    onChange={formik.handleChange} />
                {formik.touched.userName && formik.errors.userName ?
                    <div className='error-red'>{formik.errors.userName}</div> : null}
            </div>
            <div className="spaced-element">
                <TextField
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    label="First Name"
                    onChange={formik.handleChange} />
                {formik.touched.firstName && formik.errors.firstName ?
                    <div className='error-red'>{formik.errors.firstName}</div> : null}
            </div>
            <div className="spaced-element">
                <TextField
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    label="Last Name"
                    onChange={formik.handleChange} />
                {formik.touched.lastName && formik.errors.lastName ?
                    <div className='error-red'>{formik.errors.lastName}</div> : null}
            </div>
            <div className="spaced-element">
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    label="Email"
                    formnovalidate="formnovalidate"
                    onChange={formik.handleChange} />
                {formik.touched.email && formik.errors.email ?
                    <div className='error-red'>{formik.errors.email}</div> : null}
            </div>
            <div className="spaced-element">
                <TextField
                    id="password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    label="Password"
                    onChange={formik.handleChange} />
                {formik.touched.password && formik.errors.password ?
                    <div className='error-red'>{formik.errors.password}</div> : null}
            </div>
            <div className="spaced-element">
                <TextField
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    label="Confirm Password"
                    onChange={formik.handleChange} />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                    <div className='error-red'>{formik.errors.confirmPassword}</div> : null}
            </div>

            <div className="spaced-element">
                <Button className="button-type" variant="contained" type="submit">Sign Up</Button>
                <Button className="button-type" variant="contained" onClick={formik.handleReset}>Cancel</Button>
            </div>
            <div>
                <Typography>Login to your account<Link to="/login">Login</Link></Typography>
            </div>
        </form>
    )
}

export default SignUpComponent;
