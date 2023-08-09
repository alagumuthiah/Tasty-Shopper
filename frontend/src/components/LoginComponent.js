import { TextField, Typography } from "@mui/material";
import ButtonComponent from '../components/ButtonComponent';
import { Link, Navigate } from 'react-router-dom';
import React from 'react';
import { fetchUser } from "../utils/fetchData";
import { login } from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';


function LoginComponent() {
    const userInfo = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    const defaultValues = {
        userName: '',
        password: ''
    }

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(3, 'Username has to be atleast 3 characters')
                .max(40, 'Username has to be less than 40 characters')
                .required('Username is a required field'),
            password: Yup.string()
                .min(3, 'Password has to be atleast 3 characters')
                .max(40, 'Password has to be less than 40 characters')
                .required('Password is a required field'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.setSubmitting({ isSubmitting: true });
        }
    });
    React.useEffect(() => {
        if (formik.isSubmitting && !formik.isValidating) {

            const response = fetchUser('/users/login', formik.values);
            console.log(response);
            response
                .then((userData) => {
                    if (userData.data.hasOwnProperty("userName")) {
                        console.log(userData);
                        let token = userData.headers['access-token'];
                        sessionStorage.setItem('access-token', token);
                        alert('Login successful');
                        dispatch(login(userData.data));
                    } else {
                        alert(` Error: ${userData.data.Error}`);
                    }

                })
                .catch((error) => {
                    alert('Error');
                    console.log('Error', error);
                })
            formik.handleReset();

        }
    }, [formik.isSubmitting]);

    //Use useEffect to send the data to the database and authenticate the user
    //Check for the Error, it shows login successful when I submit an empty form
    if (userInfo.isLogged) {
        return <Navigate to="/myrecipes" replace="true" />
    }
    return (
        <form className="form-section" onSubmit={formik.handleSubmit}>
            <Typography className="spaced-element">Login to view/create custom recipes and use shopping list</Typography>
            <div className="spaced-element">
                <TextField
                    id="userName"
                    name="userName"
                    type="text"
                    label="UserName"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                />
            </div>
            <div className="spaced-element">
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password} />

            </div>
            <div className="spaced-element">
                <ButtonComponent text="Login" />
            </div>
            <div className="spaced-element">
                <Typography>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
            </div>
        </form>

    )
}

export default LoginComponent;
