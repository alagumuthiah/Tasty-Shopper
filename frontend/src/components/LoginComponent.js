import { TextField, Typography } from "@mui/material";
import ButtonComponent from '../components/ButtonComponent';
import { Link } from 'react-router-dom';
import React from 'react';
import axios from "axios";

function LoginComponent() {

    const defaultValues = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = React.useState(defaultValues);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        console.log('inside use Effect');
        if (isSubmitted) {
            console.log('Call login user');

            const response = loginUser();
            console.log(response);
            response.then((userData) => {
                setUser(userData);
            })

        }
        async function loginUser() {
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/users/login',
                    data: formData
                });
                setIsSubmitted(false);
                setFormData(defaultValues);
                return response.data;
            }
            catch (err) {
                setIsSubmitted(false);
                console.log(err);
                alert(err.response.data);
            }
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
        //alert(`Username:${formData.username} Password:${formData.password}`);
        console.log(formData.username, formData.password);
        setIsSubmitted(true);
        //setFormData(defaultValues);
        //setIsSubmitted(false);
    }


    //Use useEffect to send the data to the database and authenticate the user
    return (
        <form class="form-section" onSubmit={handleSubmit}>
            <Typography>Login to view custom recipes</Typography>
            <div class="spaced-element">
                <TextField
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    label="Username"
                    value={formData.username} />
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
            <h1>{user}</h1>
        </form>

    )
}

export default LoginComponent;
