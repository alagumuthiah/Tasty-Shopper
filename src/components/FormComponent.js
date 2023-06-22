import React from 'react';
import { TextField, Typography, Button, FormControl, Select, MenuItem, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';

//check how to handle File Upload and get the data
//handle change and handlechangedata index - how to use the same fuction to handle changes
//Does using separate delete buttons causes re render of the text areas for instructions
//To make my form elements controlled - for ingredients - how can I do it? Can I use three separate arrays for name, quantity and measurement? Or can I make use of an array of Objects with each object of the format { name: '', quantity: '', measurement: '' }
//How to find the event(element) for add and delete button

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
    const cuisineOptions = ["Indian", "Mexican", "Thai", "Chinese", "American", "Italian"];
    const ingredientList = ["Potato", "Milk", "Mushroom", "Paneer", "Tomato", "Onion"];
    const measurements = ["cup", "teaspoon", "tablespoon", "ml", "liters", "grams", "kilograms", "oz", "ounce"];
    const [recipeData, setRecipeData] = React.useState(defaultValues);

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Handle Submit');
        console.log(recipeData);
        handleReset();
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
        console.log('change in ingredients fields');
        const inst = recipeData.ingredients;
        inst[index][event.target.name] = event.target.value;
        setRecipeData((prevData) => ({
            ...prevData,
            ingredients: inst
        })
        )

    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography>Create Recipe</Typography>
            <div>
                <TextField
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    label="Title"
                    value={recipeData.title} />
            </div>
            <div>
                <TextField
                    id="servings"
                    name="servings"
                    type="number"
                    onChange={handleChange}
                    label="Servings"
                    value={recipeData.servings} />
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
                        {cuisineOptions.map((cuisine, index) => {
                            return (
                                <MenuItem key={index} value={cuisine}>{cuisine}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormLabel>Do you want to make it public?</FormLabel>
                    <RadioGroup name="isPublic" value={recipeData.isPublic} onChange={handleChange}>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No"
                            control={<Radio />} label="No" />
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
                    value={recipeData.image} />
            </div>
            <div>
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
            <div>
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
                <Button variant="contained" type="submit">CREATE</Button>
            </div>
        </form>
    )
}

export default FormComponent;
