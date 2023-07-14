import { TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import React from 'react';
import { fetchUser } from "../shared/fetchData";
import { useDispatch } from 'react-redux';
import { login } from '../store/session';

function SignUpComponent() {
    const dispatch = useDispatch();
    const defaultValues = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    //how to use ButtonComponent - check
    /* 1. Get the data from the fields in handleSubmit, use a submitted variable to denote that data is submitted
    2. after submitting, useEffect has to be used as it in an external API call - check if userName and password match => call the signup API with the data. Handle the response from signup API
    */
    const [signUpData, setSignUpData] = React.useState(defaultValues);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    React.useEffect(() => {
        if (isSubmitted) {
            const response = fetchUser('/users/signup', signUpData);
            console.log(response); //error handling needs to be implemented
            response
                .then((userData) => {
                    if (userData !== 'error') {
                        dispatch(login(userData));
                    }

                })
                .catch((error) => {
                    console.log('Erro');
                })
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    function handleChange(event) {
        setSignUpData((prevSignUpData) => ({
            ...prevSignUpData,
            [event.target.name]: event.target.value
        })
        )
    }

    function handleReset() {
        setSignUpData(defaultValues);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(signUpData);
        setIsSubmitted(true);
        alert(`Data submitted with the values ${signUpData.userName}`);
    }

    return (
        <form className="form-section" onSubmit={handleSubmit}>
            <Typography>New User? Please Sign Up</Typography>
            <div className="spaced-element">
                <TextField
                    id="userName"
                    type="text"
                    name="userName"
                    value={signUpData.userName}
                    label="userName"
                    onChange={handleChange} />
            </div>
            <div className="spaced-element">
                <TextField
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={signUpData.firstName}
                    label="First Name"
                    onChange={handleChange} />
            </div>
            <div className="spaced-element">
                <TextField
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={signUpData.lastName}
                    label="Last Name"
                    onChange={handleChange} />
            </div>
            <div className="spaced-element">
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    value={signUpData.email}
                    label="Email"
                    onChange={handleChange} />
            </div>
            <div className="spaced-element">
                <TextField
                    id="password"
                    type="password"
                    name="password"
                    value={signUpData.password}
                    label="Password"
                    onChange={handleChange} />
            </div>
            <div className="spaced-element">
                <TextField
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    label="Confirm Password"
                    onChange={handleChange} />
            </div>

            <div className="spaced-element">
                <Button className="button-type" variant="contained" type="submit">Sign Up</Button>
                <Button className="button-type" variant="contained" onClick={handleReset}>Cancel</Button>
            </div>
            <div>
                <Typography>Login to your account<Link to="/login">Login</Link></Typography>
            </div>
        </form>
    )
}

export default SignUpComponent;
