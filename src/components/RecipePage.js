import RecipeCard from "./RecipeCard";
import { Typography,TextField } from "@mui/material";
import React from "react";
import axios from 'axios';

function RecipePage(){
    /*const userBased = 1;
    let res;
    if(userBased===1){
        res = recipeArray;
    }else{

    }*/
    const [searchText,setSearchText] = React.useState('recipes');
    const [recipeData,setRecipeData] = React.useState([]);

    React.useEffect(()=>{
        async function fetchRecipes(){
            const response = await axios({
                method:'get',
                url:`https://api.api-ninjas.com/v1/recipe?query=${searchText}`,
                headers:{
                    'X-Api-Key':'h65Nj06ZBZnnweHiXIrMV3pTu4nBU2kbzRYGIkjz'
                }
            });
            setRecipeData(response.data);
        }
        fetchRecipes();

    },[searchText])

    const recipeCards = recipeData.map((recipe)=>{
        return(
            <RecipeCard recipe={recipe}/>
        )
    })

    const handleChange=(event)=>{
        console.log('event changed');
        setSearchText(event.target.value);
    }

    return(
        <div>
            <h1>Recipe Page</h1>
            <div>
            <Typography>Login to view custom recipes</Typography>
            <div>
                <TextField
                id="searchText"
                name="searchText"
                type="text"
                onChange={handleChange}
                label="Search"
                value={searchText}/>
            </div>
            </div>
            <div className="card--div">
                {recipeCards}
            </div>
        </div>
    )
}

export default RecipePage;