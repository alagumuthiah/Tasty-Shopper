import RecipeCard from "./RecipeCard";
import { Link } from 'react-router-dom';
import { Typography, TextField } from "@mui/material";
import React from "react";
//import fetchRecipes from '../shared/fetchData';
import Button from "@mui/material/Button";
import recipes from '../data/sampleRecipeData';
import { searchMyRecipes, resetMyRecipes } from "../store/myRecipes";
import { useSelector, useDispatch } from 'react-redux';

function MyRecipes() {

    /* Import the sample data created and populate the data for my recipes with the sample data*/
    const myRecipesData = useSelector((state) => state.myRecipes);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');

    React.useEffect(() => {
        if (searchText.length > 0) {
            //this has to be replaced by fetching the code from database
            const filterRecipe = recipes.filter((recipe) => {
                return recipe['title'].toLowerCase().includes(searchText);
            });
            dispatch(searchMyRecipes(filterRecipe));

        } else {
            dispatch(resetMyRecipes());
        }
    }, [searchText])

    const recipeCards = myRecipesData.map((recipe) => {
        return (
            <RecipeCard recipe={recipe} />
        )
    })

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <div>
            <div className="spaced-element">
                <h1>Recipe Page</h1>
                <Button variant="contained"><Link className="link-style" to="/create/recipe">Create Recipe</Link></Button>
            </div>
            <div className="spaced-element">
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
            <div className="card--div spaced-element">
                {recipeCards}
            </div>
        </div>
    )
}

export default MyRecipes;
