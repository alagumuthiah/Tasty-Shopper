import RecipeCard from "./RecipeCard";
import { Link } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';
import { Typography, TextField } from "@mui/material";
import React from "react";
import { fetchRecipes } from '../shared/fetchData';
import Button from "@mui/material/Button";
import { fetchMyRecipes, resetMyRecipes } from "../store/myRecipes";
import { useSelector, useDispatch } from 'react-redux';

function MyRecipes() {

    /* Import the sample data created and populate the data for my recipes with the sample data*/
    const myRecipesData = useSelector((state) => state.myRecipes.data);
    const pageNumber = useSelector((state) => state.myRecipes.pageNumber);
    const userAuthentication = useSelector((state) => state.userInfo);

    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');
    const [filteredRecipe, setFilteredRecipe] = React.useState([]);
    const uri = '/recipes/myRecipes';
    //need to check when to invoke the API, when the search text gets modified or invoke the API and store the result - then just filter the data when search text changes (this minimize the number of API calls but data might not be accurate because when user include a new entry that will not be displayed)
    //look ahead - for recipe names

    //this useEffect is executed every time when the component is rendered, so the API call is done only first time
    React.useEffect(() => {
        const response = fetchRecipes(uri, pageNumber);
        console.log(response);
        response
            .then(recipeData => {
                console.log(recipeData);
                if (recipeData.hasOwnProperty('Error')) {
                    dispatch(resetMyRecipes());
                    setFilteredRecipe([]);
                } else {
                    dispatch(fetchMyRecipes(recipeData.data));
                    setFilteredRecipe(recipeData.data);
                    console.log(myRecipesData);
                }
            })
            .catch((error) => {
                console.log(`New Error:${error}`);
            })

    }, [pageNumber]);

    //this useEffect is executed when there is a change in the search text and it
    //just updates the local state value with the search string filter

    React.useEffect(() => {
        if (searchText.length > 0) {
            console.log(myRecipesData);
            let filteredList = myRecipesData.filter((recipe) => {
                return recipe['title'].toLowerCase().includes(searchText.toLowerCase());
            });
            setFilteredRecipe(filteredList);
        } else {
            setFilteredRecipe(myRecipesData);
        }
        sessionStorage.setItem('searchText', JSON.stringify(searchText));


    }, [searchText])

    const recipeCards = filteredRecipe.map((recipe) => {
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
                {userAuthentication?.isLogged ?
                    <div>
                        <Button variant="contained"><Link className="link-style" to="/create/recipe">Create Recipe</Link></Button>
                        <Typography>View your recipes/ popular recipes</Typography>
                    </div>
                    :
                    <div>
                        <Typography>Login to view/create custom recipes</Typography>
                    </div>
                }

            </div>
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
                {myRecipesData.length !== 0 ? recipeCards : 'No recipes to display'}
            </div>
            {filteredRecipe.length !== 0 && <PaginationComponent />}
        </div>
    )
}

export default MyRecipes;
