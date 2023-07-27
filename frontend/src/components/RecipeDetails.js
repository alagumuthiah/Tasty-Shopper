import { useLocation, Link } from "react-router-dom";
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { deleteRecipe } from "../shared/modifyData";

function RecipeDetails() {
    const userInfo = useSelector((state) => state.userInfo);
    const location = useLocation();
    //the variable passed as a state from the component can be accessed with the state and destructured with the same name given as a key
    const { selectedRecipe } = location.state;
    //Custom recipe has cuisine
    let fromCustomRecipe = selectedRecipe.hasOwnProperty('cuisine');
    let instructions;
    let ingredients;
    if (fromCustomRecipe) {
        instructions = selectedRecipe.instruction;
        ingredients = selectedRecipe.Ingredients;
    } else {
        instructions = selectedRecipe.instructions.split("."); //issues in few recipes as there is a "." afterthe number of steps. so that is considered as a new instruction(number render as one instruction and the actual instruction as separate instruction )
        instructions.pop();
        //when we split with "." as a delimiter- the last entry is an empty string. So poppingthe last element form the splitted array
        ingredients = selectedRecipe.ingredients.split('|');


    }
    let currUser = false;
    if (fromCustomRecipe && userInfo.isLogged) { //check if the recipe details is for a custom/ user created recipe, if yes then get the userInfo from redux store and check if the current Recipe user matches with the loggedin user
        currUser = (userInfo.userName === selectedRecipe.User.userName);
    }

    //Get the value from local storage , convert it to an array and add the new element to the localstorage
    //Check on how localstorage has to be cleared after closing the tab and reopening
    function handleShoppingList(event) {
        const list = JSON.parse(localStorage.getItem("shoppingList") || "[]");
        list.push(selectedRecipe.title);
        console.log(list);
        localStorage.setItem("shoppingList", JSON.stringify(list));
    }

    function handleDelete(event) {
        const res = window.confirm("Are you sure you want to delete this recipe?");
        if (res) {
            console.log(selectedRecipe);
            let uri = `/recipes/${selectedRecipe.id}`;
            console.log('Deleted');
            const response = deleteRecipe(uri);
            response
                .then((deleteRecipe) => {
                    if (deleteRecipe.hasOwnProperty("Error")) {
                        alert(` Error: ${deleteRecipe.Error}`);
                    } else {
                        alert('Recipe successfully created');
                    }
                })
        } else {
            alert('You cancelled the operation, Recipe not deleted');
        }
    }

    return (

        <div>
            <h1>Recipe Details</h1>
            <h2>Recipe Title:{selectedRecipe.title}</h2>
            <h2>Servings:{selectedRecipe.servings}</h2>
            {fromCustomRecipe &&
                <h2>Cuisine:{selectedRecipe.cuisine}</h2>
            }
            <h3>Ingredients</h3>
            <ol>
                {ingredients.map((ingredient) => {
                    return fromCustomRecipe ?
                        <li>{ingredient.RecipeIngredient.quantity} {ingredient.RecipeIngredient.unit} of {ingredient.name}</li>
                        : <li>{ingredient}</li>
                })}
            </ol>
            <h3>Steps & Instruction</h3>
            <ul>
                {instructions.map((instruction) => {
                    return <li>{instruction}</li>
                })}
            </ul>
            {fromCustomRecipe &&
                <h3>{`Author: ${selectedRecipe.User.firstName} ${selectedRecipe.User.lastName}`}</h3>
            }
            {currUser &&
                <Link to={`/update/recipe/${selectedRecipe.id}`} state={{ updateRecipe: selectedRecipe }} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" type="submit">UPDATE</Button>
                </Link>
            }
            {currUser &&
                <Button variant="contained" type="submit" onClick={handleDelete}>DELETE</Button>
            }
            <Button variant="contained" color="secondary"
                onClick={handleShoppingList}>Add to ShoppingList</Button>

        </div>
    )
}

export default RecipeDetails;
