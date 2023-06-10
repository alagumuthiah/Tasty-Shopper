import {TextField,Button, Typography,FormControl,FormLabel,Radio, RadioGroup,FormControlLabel } from "@mui/material";
import {Link} from 'react-router-dom';
import React from 'react';

function SignUpComponent(){
    const defaultValues =  {
        username:"",
        password:"",
        confirmPassword:"",
        email:"",
        gender:"",
        dob:"",
        phoneNumber:"",
        summary:""
    }

    //include Phone number
    const [signUpData,setSignUpData] = React.useState(defaultValues);

    function handleChange(event){
        console.log("Changed");
        setSignUpData((prevSignUpData)=>({
            ...prevSignUpData,
            [event.target.name]:event.target.value
        })
        )
    }

    function handleReset(){
        setSignUpData(defaultValues);
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(signUpData);
        handleReset();
        alert(`Data submitted with the values ${signUpData.username}`);
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                id="username"
                type="text"
                name="username"
                value={signUpData.username}
                label="Username"
                onChange={handleChange}/>
            </div>
            <div>
                <TextField
                id="password"
                type="password"
                name="password"
                value={signUpData.password}
                label="Password"
                onChange={handleChange}/>
            </div>
            <div>
                <TextField
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                label="Confirm Password"
                onChange={handleChange}/>
            </div>
            <div>
            <TextField
                id="email"
                type="email"
                name="email"
                value={signUpData.email}
                label="Email"
                onChange={handleChange}/>
            </div>
            <div>
            <TextField
                id="summary"
                name="summary"
                type="text"
                value={signUpData.summary}
                multiline
                minRows={4}
                maxRows={8}
                onChange={handleChange}
                />

            </div>
            <div>
                <FormLabel>Date of Birth</FormLabel>
                <TextField
                id="dob"
                type="date"
                name="dob"
                value={signUpData.dob}
                onChange={handleChange}
                />
            </div>
            <div>
                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup name="gender" value={signUpData.gender} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                        <FormControlLabel value="male"
                        control={<Radio/>} label="Male"/>
                        <FormControlLabel value="other"
                        control={<Radio/>} label="Other"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <Button variant="contained" type="submit">Sign Up</Button>
                <Button variant="contained" onClick={handleReset}>Cancel</Button>
            </div>
            <div>
                <Typography>Login to your account<Link to="/login">Login</Link></Typography>
            </div>

        </form>
    )
}

export default SignUpComponent;