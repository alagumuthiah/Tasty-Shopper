import React from 'react';
import RecipeCard from "./RecipeCard";
import { Typography, TextField } from "@mui/material";
import { fetchRecipes } from '../shared/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { searchPublicRecipes, resetPublicRecipes } from '../store/publicRecipes';

function HomeComponent() {
    const userAuthentication = useSelector((state) => state.userInfo);
    const publicRecipesData = useSelector((state) => state.publicRecipes);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };
    const uri = '/recipes/publicRecipes';
    React.useEffect(() => {
        if (searchText.length > 0) {
            const response = fetchRecipes(uri, searchText);
            console.log(response);
            response
                .then(recipeData => {
                    console.log(recipeData);
                    if (recipeData.data.hasOwnProperty('Error')) {
                        dispatch(resetPublicRecipes());
                    } else {
                        const myRecipeList = recipeData.data.filter((recipe) => {
                            return recipe['title'].toLowerCase().includes(searchText.toLowerCase());
                        });
                        dispatch(searchPublicRecipes(myRecipeList));
                        console.log(publicRecipesData);
                    }

                })
                .catch((error) => {
                    console.log(`New Error:${error}`);
                })
        } else {
            dispatch(resetPublicRecipes());
        }
        sessionStorage.setItem('searchText', JSON.stringify(searchText));


    }, [searchText])

    const recipeCards = publicRecipesData.map((recipe) => {
        return (
            <RecipeCard recipe={recipe} />
        )
    })

    return (
        <div>
            <div className="spaced-element">
                <h1>Welcome to the Recipe Page {userAuthentication.isLogged && `, ${userAuthentication.firstName}`}</h1>
            </div>
            {userAuthentication.isLogged ?
                <div className="spaced-element">
                    <Typography>Search for public recipes and your recipes</Typography>
                </div>
                : <div className="spaced-element">
                    <Typography>View public Recipes, Login to view your own recipes</Typography>
                </div>
            }

            <div className="spaced-element">
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
                {publicRecipesData.length !== 0 ? recipeCards : 'No recipes to display'}
                {/* {recipeCards} */}
            </div>
        </div>
    );
}

export default HomeComponent;
