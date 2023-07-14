import { TextField, Typography } from "@mui/material";
import ButtonComponent from '../components/ButtonComponent';
import { Link } from 'react-router-dom';
import React from 'react';
import { fetchUser } from "../shared/fetchData";
import { login } from '../store/session';
import { useDispatch } from 'react-redux';

function LoginComponent() {
    const dispatch = useDispatch();
    const defaultValues = {
        userName: "",
        password: ""
    }
    const [formData, setFormData] = React.useState(defaultValues);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    React.useEffect(() => {
        if (isSubmitted) {
            console.log('Call login user');

            const response = fetchUser('/users/login', formData);
            console.log(response);
            response
                .then((userData) => {
                    console.log(userData);
                    if (userData !== "error") {
                        console.log(userData);
                        alert('Login successful');
                        dispatch(login(userData));
                    }

                })
                .catch((error) => {
                    alert('Error');
                    console.log('Error', error);
                })
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }))
    }


    function handleSubmit(event) {
        console.log(event);
        event.preventDefault();
        console.log(formData.userName, formData.password);
        setIsSubmitted(true);
    }


    //Use useEffect to send the data to the database and authenticate the user
    return (
        <form class="form-section" onSubmit={handleSubmit}>
            <Typography>Login to view custom recipes</Typography>
            <div class="spaced-element">
                <TextField
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={handleChange}
                    label="userName"
                    value={formData.userName} />
            </div>
            <div class="spaced-element">
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    label="Password"
                    value={formData.password} />
            </div>
            <div class="spaced-element">
                <ButtonComponent text="Login" />
            </div>
            <div class="spaced-element">
                <Typography>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
            </div>
        </form>

    )
}

export default LoginComponent;
