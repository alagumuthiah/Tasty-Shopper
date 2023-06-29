import { TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import React from 'react';

function SignUpComponent() {
    const defaultValues = {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    //how to use ButtonComponent - check
    const [signUpData, setSignUpData] = React.useState(defaultValues);

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
        handleReset();
        alert(`Data submitted with the values ${signUpData.username}`);
    }

    return (
        <form class="form-section" onSubmit={handleSubmit}>
            <Typography>New User? Please Sign Up</Typography>
            <div class="spaced-element">
                <TextField
                    id="username"
                    type="text"
                    name="username"
                    value={signUpData.username}
                    label="Username"
                    onChange={handleChange} />
            </div>
            <div class="spaced-element">
                <TextField
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={signUpData.firstname}
                    label="First Name"
                    onChange={handleChange} />
            </div>
            <div class="spaced-element">
                <TextField
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={signUpData.lastname}
                    label="Last Name"
                    onChange={handleChange} />
            </div>
            <div class="spaced-element">
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    value={signUpData.email}
                    label="Email"
                    onChange={handleChange} />
            </div>
            <div class="spaced-element">
                <TextField
                    id="password"
                    type="password"
                    name="password"
                    value={signUpData.password}
                    label="Password"
                    onChange={handleChange} />
            </div>
            <div class="spaced-element">
                <TextField
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    label="Confirm Password"
                    onChange={handleChange} />
            </div>

            <div class="spaced-element">
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
