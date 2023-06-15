import React from 'react';
import {TextField, Typography} from '@mui/material';

function FormComponent(){
    const defaultValues = {
        title:"",
        ingredients:"",
        servings:"",
        instructions:""
    }
    const [recipeData,setRecipeData] = React.useState({});

    return(
        <form>
            <label htmlFor="name"></label>
            <input type="textbox" label="recipe" name="name"/>
        </form>
    )
}

export default FormComponent;