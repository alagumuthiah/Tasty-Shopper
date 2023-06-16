import React from 'react';
import {TextField, Typography, Button, FormControl, Select,MenuItem, FormLabel,Radio,RadioGroup,FormControlLabel} from '@mui/material';

//check how to handle File Upload and get the data
//handle change and handlechangedata index - how to use the same fuction to handle changes
//Does using separate dleete buttons causes re render of the text areas for instructions
function FormComponent(){
    const defaultValues = {
        title:"",
        servings:"",
        cuisine:"",
        instructions:[],
        ingredients:[{name:'',quantity:'',measurement:''}],
        image:"",
        isPublic:""
    }
    const cuisineOptions =["Indian","Mexican","Thai","Chinese","American","Italian"];
    const [recipeData,setRecipeData] = React.useState(defaultValues);

    function handleSubmit(event){
        event.preventDefault();
        console.log('Handle Submit');
        console.log(recipeData);
        handleReset();
    }

    function handleChange(event){
        setRecipeData((prevData)=>({
                ...prevData,
                [event.target.name] :event.target.value
        })
        )
    }

    function handleReset(){
        setRecipeData(defaultValues);
    }

    function handleChangeData(event,index){
        const inst = recipeData.instructions;
        inst[index] = event.target.value;
        setRecipeData((prevData)=>({
            ...prevData,
            [event.target.name] :inst
        })
    )
    }

    function handleAdd(event){
        setRecipeData((prevData)=>({
            ...prevData,
            instructions:[...recipeData.instructions,""]
        }));
    }

    function handleDelete(event,index){
        console.log(index);
        const inst = recipeData.instructions;
        inst.splice(index,1);
        setRecipeData((prevData)=>({
            ...prevData,
            [event.target.name]:inst
        }))
    }

    return(
        <form onSubmit={handleSubmit}>
            <Typography>Create Recipe</Typography>
            <div>
                <TextField
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                label="Title"
                value={recipeData.title}/>
            </div>
            <div>
                <TextField
                id="servings"
                name="servings"
                type="number"
                onChange={handleChange}
                label="Servings"
                value={recipeData.servings}/>
            </div>
            <div>
            <FormControl>
                  <Select
                    id="cuisine"
                    name="cuisine"
                    onChange={handleChange}
                    label="Cuisine"
                    value={recipeData.cuisine}
                >
                     {cuisineOptions.map((cuisine,index)=>{
                        return(
                            <MenuItem  key={index} value={cuisine}>{cuisine}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormLabel>Do you want to make it public?</FormLabel>
                    <RadioGroup name="isPublic" value={recipeData.isPublic} onChange={handleChange}>
                        <FormControlLabel value="Yes" control={<Radio/>} label="Yes"/>
                        <FormControlLabel value="No"
                        control={<Radio/>} label="No"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormLabel>Upload Image of your Recipe</FormLabel>
                <TextField
                id="image"
                name="image"
                type="file"
                onChange={handleChange}
                value={recipeData.image}/>
            </div>
            <div>
                <FormLabel>Instructions</FormLabel>
                {recipeData.instructions.map((instruction,index)=>{
                    return(
                    <div key={index} style={{padding:"10px"}}>
                    <TextField
                    name="instructions"
                    type="text"
                    value={instruction}
                    multiline
                    minRows={4}
                    maxRows={8}
                    onChange={event=>handleChangeData(event,index)}
                    />
                    <Button variant="contained" onClick={event => handleDelete(event,index)}>Delete</Button>
                    </div>
                    )
                })}
                <Button variant="contained" onClick={handleAdd}>Add</Button>

            </div>
            <div>
                <Button variant="contained" type="submit">CREATE</Button>
            </div>
        </form>
    )
}

export default FormComponent;