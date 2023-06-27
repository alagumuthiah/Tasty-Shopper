import { TextField, Typography } from "@mui/material";
import ButtonComponent from '../components/ButtonComponent';
import { Link } from 'react-router-dom';
import React from 'react';

function LoginComponent() {

    const defaultValues = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = React.useState(defaultValues);

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }))
    }


    function handleSubmit(event) {
        console.log(event);
        event.preventDefault();
        setFormData(defaultValues)
        alert(`Username:${formData.username} Password:${formData.password}`);
    }


    //Use useEffect to send the data to the database and authenticate the user
    return (
        <form onSubmit={handleSubmit}>
            <Typography>Login to view custom recipes</Typography>
            <div>
                <TextField
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    label="Username"
                    value={formData.username} />
            </div>
            <div>
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    label="Password"
                    value={formData.password} />
            </div>
            <div>
                <ButtonComponent text="Login" />
            </div>
            <div>
                <Typography>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
            </div>
        </form>

    )
}

export default LoginComponent;
