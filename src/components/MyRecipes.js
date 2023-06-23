import RecipeCard from "./RecipeCard";
import { Link } from 'react-router-dom';
import { Typography, TextField } from "@mui/material";
import React from "react";
import fetchRecipes from '../shared/fetchData';

function MyRecipes() {

    /* Write the API call in a separate function and import . Use it in two routes*/
    const [searchText, setSearchText] = React.useState('');
    const [recipeData, setRecipeData] = React.useState([]);
    const url = 'https://api.api-ninjas.com/v1/recipe';
    React.useEffect(() => {
        if (searchText.length > 0) {
            const response = fetchRecipes(url, searchText);
            response.then(data => setRecipeData(data));
        }

    }, [searchText])

    const recipeCards = recipeData.map((recipe) => {
        return (
            <RecipeCard recipe={recipe} />
        )
    })

    const handleChange = (event) => {
        console.log('event changed');
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
