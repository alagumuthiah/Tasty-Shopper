import React from 'react';
import RecipeCard from "./RecipeCard";
import PaginationComponent from './PaginationComponent';
import { Typography, TextField } from "@mui/material";
import { fetchRecipes } from '../shared/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicRecipes, resetPublicRecipes } from '../store/publicRecipes';

function HomeComponent() {
    const userAuthentication = useSelector((state) => state.userInfo);
    const pageNumber = useSelector((state) => state.publicRecipes.pageNumber);
    const publicRecipesData = useSelector((state) => state.publicRecipes.data);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');
    const [filteredRecipe, setFilteredRecipe] = React.useState([]);


    const uri = '/recipes/publicRecipes';
    React.useEffect(() => {
        console.log('API call');
        const response = fetchRecipes(uri, pageNumber);
        console.log(response);
        response
            .then(recipeData => {
                console.log(recipeData);
                if (recipeData.hasOwnProperty('Error')) {
                    dispatch(resetPublicRecipes());
                } else {
                    dispatch(fetchPublicRecipes(recipeData.data));
                    setFilteredRecipe(recipeData.data);
                }

            })
            .catch((error) => {
                console.log(`New Error:${error}`);
            })

    }, [pageNumber])

    React.useEffect(() => {
        console.log('Filter');
        if (searchText.length > 0) {
            const filteredList = publicRecipesData.filter((recipe) => {
                return recipe['title'].toLowerCase().includes(searchText.toLowerCase());
            });
            setFilteredRecipe(filteredList);
        } else {
            setFilteredRecipe([]);
        }
        sessionStorage.setItem('searchText', JSON.stringify(searchText));

    }, [searchText])

    const recipeCards = filteredRecipe.map((recipe) => {
        return (
            <RecipeCard recipe={recipe} />
        )
    });

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

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
            {filteredRecipe.length !== 0 && <PaginationComponent />}
        </div>
    );
}

export default HomeComponent;
