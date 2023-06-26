import RecipeCard from "./RecipeCard";
import { Link } from 'react-router-dom';
import { Typography, TextField } from "@mui/material";
import React from "react";
//import fetchRecipes from '../shared/fetchData';
import recipes from '../data/sampleRecipeData';

function MyRecipes() {

    /* Import the sample data created and populate the data for my recipes with the sample data*/
    const [searchText, setSearchText] = React.useState('');
    const [recipeData, setRecipeData] = React.useState([]);
    React.useEffect(() => {
        /*Update the useEffect by the API call, after creating the API*/
        /*if (searchText.length > 0) {
            const response = fetchRecipes(url, searchText);
            response.then(data => setRecipeData(data));
        }*/
        if (searchText.length > 0) {
            //search in based on the recipe title
            const filterRecipe = recipes.filter((recipe) => {
                return recipe['title'].toLowerCase().includes(searchText);
            })
            setRecipeData(filterRecipe);
        } else {
            setRecipeData(recipes)
        }
    }, [searchText])

    const recipeCards = recipeData.map((recipe) => {
        return (
            <RecipeCard recipe={recipe} />
        )
    })

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <div>
            <div>
                <h1>Recipe Page</h1>
                <Link to="/create/recipe">Create Recipe</Link>
            </div>
            <div>
                <Typography>Login to view custom recipes</Typography>
                <div>
                    <TextField
                        id="searchText"
                        name="searchText"
                        type="text"
                        onChange={handleChange}
                        label="Search"
                        value={searchText} />
                </div>
            </div>
            <div className="card--div">
                {recipeCards}
            </div>
        </div>
    )
}

export default MyRecipes;
