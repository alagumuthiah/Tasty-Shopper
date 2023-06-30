import React from 'react';
import { useLocation, useParams } from 'react-router';
import { TextField, Typography, Button, FormControl, Select, MenuItem, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { measurements, cuisineOptions, ingredientList } from '../data/sampleSharedData';

//check how to handle File Upload and get the data
//handle change and handlechangedata index - how to use the same fuction to handle changes
//Does using separate delete buttons causes re render of the text areas for instructions
//why useParams is called everytime when I change the input fields

function FormComponent() {
    const defaultValues = {
        title: "",
        servings: "",
        cuisine: "",
        instructions: [],
        ingredients: [],
        image: "",
        isPublic: ""
    }


    const [recipeData, setRecipeData] = React.useState(defaultValues);
    //to prevent rendering of the component n number of times, we need to use useEffect to update the form with the recipe Data when the form is rendered as a update component
    const location = useLocation(); //to get the data passed from the component
    //console.log(location.pathname);
    const recipeParams = useParams();
    React.useEffect(() => {
        if (location.state != null) {
            const { updateRecipe } = location.state;
            console.log(updateRecipe);
            setRecipeData((prevData) => ({ //check if there is a better way to update my recipeData state
                ...prevData,
                title: updateRecipe.title,
                servings: updateRecipe.servings,
                cuisine: updateRecipe.cuisine,
                isPublic: updateRecipe.isPublic,
                instructions: updateRecipe.instructions,
                ingredients: updateRecipe.ingredients
            }))
        }
    }, [location.state])


    function handleSubmit(event) {
        event.preventDefault();
        console.log('Handle Submit');
        console.log(recipeData);
        if (Object.keys(recipeParams).length !== 0) {
            console.log('Update');
            updateRecipe(recipeData, recipeParams.recipeId);
        } else {
            console.log('Create');
            createRecipe(recipeData);
        }
        handleReset();
    }

    function createRecipe(recipeData) {
        console.log('Create Recipe');
        console.log(recipeData);
        //Call the POST recipe API to create a Recipe
    }

    function updateRecipe(recipeData, recipeId) {
        console.log('Update Recipe');
        console.log(recipeData);
        console.log(recipeId);
        //call the PUT API to update the recipe with the given Recipe ID
    }
    function handleChange(event) {
        setRecipeData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        })
        )
    }

    function handleReset() {
        setRecipeData(defaultValues);
    }

    function handleChangeWithIndex(event, index) {
        const inst = recipeData[event.target.name];
        inst[index] = event.target.value;
        setRecipeData((prevData) => ({
            ...prevData,
            [event.target.name]: inst
        })
        )
    }

    function handleAddWithIndex(event) {
        const dataToBeAdded = (event.target.name === "ingredients") ? { name: '', quantity: '', measurement: '' } : "";
        setRecipeData((prevData) => ({
            ...prevData,
            [event.target.name]: [...recipeData[event.target.name], dataToBeAdded]
        }));
    }

    function handleDeleteWithIndex(event, index) {
        const array = recipeData[event.target.name];
        array.splice(index, 1);
        setRecipeData((prevData) => ({
            ...prevData,
            [event.target.name]: array
        }))
    }

    function handleChangeIngredients(event, index) {
        const inst = recipeData.ingredients;
        inst[index][event.target.name] = event.target.value;
        setRecipeData((prevData) => ({
            ...prevData,
            ingredients: inst
        })
        )

    }

    return (
        <form className="form-section" onSubmit={handleSubmit}>
            <Typography>{location.state ? `Update Recipe` : `Create Recipe`}</Typography>
            <div className="spaced-element">
                <TextField
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    label="Title"
                    value={recipeData.title} />
            </div>
            <div className="spaced-element">
                <TextField
                    id="servings"
                    name="servings"
                    type="number"
                    onChange={handleChange}
                    label="Servings"
                    value={recipeData.servings} />
            </div>
            <div className="spaced-element">
                <FormControl>
                    <Select
                        id="cuisine"
                        name="cuisine"
                        onChange={handleChange}
                        label="Cuisine"
                        value={recipeData.cuisine}
                    >
                        {cuisineOptions.map((cuisine, index) => {
                            return (
                                <MenuItem key={index} value={cuisine}>{cuisine}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className="spaced-element">
                <FormControl>
                    <FormLabel>Do you want to make it public?</FormLabel>
                    <RadioGroup name="isPublic" value={recipeData.isPublic} onChange={handleChange}>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No"
                            control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="spaced-element">
                <FormLabel>Upload Image of your Recipe</FormLabel>
                <TextField
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                    value={recipeData.image} />
            </div>
            <div className="spaced-element">
                <FormLabel>Instructions</FormLabel>
                {recipeData.instructions.map((instruction, index) => {
                    return (
                        <div key={index} style={{ padding: "10px" }}>
                            <TextField
                                name="instructions"
                                type="text"
                                value={instruction}
                                multiline
                                minRows={4}
                                maxRows={8}
                                onChange={event => handleChangeWithIndex(event, index)}
                            />
                            <Button name="instructions" variant="contained" onClick={event => handleDeleteWithIndex(event, index)}>Delete</Button>
                        </div>
                    )
                })}
                <Button name="instructions" variant="contained" onClick={handleAddWithIndex}>Add</Button>

            </div>
            <div className="spaced-element">
                <FormLabel>Ingredients</FormLabel>
                {recipeData.ingredients.map((ingredient, index) => {
                    return (
                        <div key={index} style={{ padding: "10px" }}>
                            <Select
                                name="name"
                                onChange={event => handleChangeIngredients(event, index)}
                                label="Name"
                                value={ingredient.name}
                            >
                                {ingredientList.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    )
                                })}
                            </Select>
                            <TextField
                                name="quantity"
                                type="number" step="0.0001"
                                onChange={event => handleChangeIngredients(event, index)}
                                label="Quantity"
                                value={ingredient.quantity}
                            />

                            <Select
                                name="measurement"
                                onChange={event => handleChangeIngredients(event, index)}
                                label="Measurement"
                                value={ingredient.measurement}
                            >
                                {measurements.map((measurement, index) => {
                                    return (
                                        <MenuItem key={index} value={measurement}>{measurement}</MenuItem>
                                    )
                                })}
                            </Select>

                            <Button name="ingredients" variant="contained" onClick={event => handleDeleteWithIndex(event, index)}>Delete</Button>
                        </div>
                    )
                })}
                <Button name="ingredients" variant="contained" onClick={handleAddWithIndex}>Add</Button>

            </div>
            <div>
                <Button variant="contained" type="submit">{location.state ? `UPDATE` : `CREATE`}</Button>
            </div>
        </form>
    )
}

export default FormComponent;
