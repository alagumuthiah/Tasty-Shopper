import RecipeCard from "./RecipeCard";
import { Typography, TextField } from "@mui/material";
import React from "react";
import { fetchRecipes } from '../shared/fetchData';
import { searchOtherRecipes, resetOtherRecipes } from '../store/otherRecipes';
import { useSelector, useDispatch } from 'react-redux';

//Is it possible to use the same MyRecipe component and render the Other recipes from external API?
function RecipePage() {

    /* Write the API call in a separate function and import . Use it in two routes*/
    const otherRecipesData = useSelector((state) => state.otherRecipes);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState(JSON.parse(sessionStorage.getItem('searchText')) || ''); //check if search text can also be put in the store
    const url = 'https://api.api-ninjas.com/v1/recipe';
    React.useEffect(() => {
        if (searchText.length > 0) {
            const response = fetchRecipes(url, searchText);
            response
                .then(data => {
                    console.log(data);
                    dispatch(searchOtherRecipes(data));
                    console.log(otherRecipesData);
                })
                .catch((error) => {
                    console.log('Error');
                })
        } else {
            dispatch(resetOtherRecipes());
        }
        sessionStorage.setItem('searchText', JSON.stringify(searchText));


    }, [searchText])

    const recipeCards = otherRecipesData.map((recipe) => {
        return (
            <RecipeCard recipe={recipe} />
        )
    })

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <div>
            <h1>Other Recipes</h1>
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

export default RecipePage;
