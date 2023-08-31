import RecipeCard from "./RecipeCard";
import { Link } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';
import { Typography, TextField } from "@mui/material";
import React from "react";
import { fetchRecipes } from '../utils/fetchData';
import Button from "@mui/material/Button";
import { fetchMyRecipes, resetMyRecipes, resetPageNumber } from "../store/myRecipes";
import { useSelector, useDispatch } from 'react-redux';

function MyRecipes() {

    /* Import the sample data created and populate the data for my recipes with the sample data*/
    const myRecipesData = useSelector((state) => state.myRecipes.data);
    const pageNumber = useSelector((state) => state.myRecipes.pageNumber);
    const userAuthentication = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');
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
                if (recipeData.data.hasOwnProperty('Error')) {
                    setErrMsg(recipeData.data.Error);
                    console.log(recipeData.data);
                    dispatch(resetMyRecipes());
                    dispatch(resetPageNumber(pageNumber));
                    setFilteredRecipe([]);
                } else {
                    dispatch(fetchMyRecipes(recipeData.data));
                    setFilteredRecipe(recipeData.data);
                    setErrMsg('');
                }
            })
            .catch((error) => {
                console.log(`New Error:${error}`);
            })

    }, [dispatch, pageNumber]);

    //this useEffect is executed when there is a change in the search text and it
    //just updates the local state value with the search string filter

    React.useEffect(() => {
        if (searchText.length > 0) {
            console.log(myRecipesData);
            if (myRecipesData && Array.isArray(myRecipesData)) {
                let filteredList = myRecipesData.filter((recipe) => {
                    return recipe['title'].toLowerCase().includes(searchText.toLowerCase());
                });
                setFilteredRecipe(filteredList);
                if (filteredList.length > 0) {
                    setErrMsg('');
                } else {
                    setErrMsg('No recipe matches with search string');
                }

            } else {
                setFilteredRecipe([]);
                setErrMsg('No recipe matches with search string');
            }

        } else {
            setFilteredRecipe(myRecipesData);
            if (myRecipesData.length > 0) {
                setErrMsg('');
            }
        }
        sessionStorage.setItem('searchText', JSON.stringify(searchText));


    }, [myRecipesData, searchText])

    let recipeCards = null;
    if (filteredRecipe && Array.isArray(filteredRecipe)) {
        recipeCards = filteredRecipe.map((recipe) => {
            return (
                <RecipeCard recipe={recipe} />
            )
        });
    }
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
                {recipeCards}
                {errMsg.length > 0 && <h3>{errMsg}</h3>}
            </div>

            <PaginationComponent />
        </div>
    )
}

export default MyRecipes;
