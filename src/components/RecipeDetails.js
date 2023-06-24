import { useLocation, Link } from "react-router-dom";
import { Button } from '@mui/material';

function RecipeDetails() {
    const location = useLocation();
    //the variable passed as a state from the component can be accessed with the state and destructured with the same name given as a key
    const { selectedRecipe } = location.state;
    console.log(selectedRecipe.hasOwnProperty('id')); // to check if this is custom recipe/ other recipes from external API.
    //Custom recipe has a recipe id
    let fromCustomRecipe = selectedRecipe.hasOwnProperty('id');
    let instructions;
    let ingredients;
    if (fromCustomRecipe) {
        instructions = selectedRecipe.instructions;
        ingredients = selectedRecipe.ingredients;
    } else {
        instructions = selectedRecipe.instructions.split("."); //issues in few recipes as there is a "." afterthe number of steps. so that is considered as a new instruction(number render as one instruction and the actual instruction as separate instruction )
        instructions.pop();
        //when we split with "." as a delimiter- the last entry is an empty string. So poppingthe last element form the splitted array
        ingredients = selectedRecipe.ingredients.split('|');

    }

    //Get the value from local storage , convert it to an array and add the new element to the localstorage
    //Check on how localstorage has to be cleared after closing the tab and reopening
    function handleShoppingList(event) {
        const list = JSON.parse(localStorage.getItem("shoppingList") || "[]");
        list.push(selectedRecipe.title);
        console.log(list);
        localStorage.setItem("shoppingList", JSON.stringify(list));
    }

    return (
        //update this recipe detail rendering based on the recipe format when recipe retrived from database if required.
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
                        <li>{ingredient.quantity} {ingredient.measurement} of {ingredient.name}</li>
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
                <Link to={`/update/recipe/${selectedRecipe.id}`} state={{ updateRecipe: selectedRecipe }} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" type="submit">UPDATE</Button>
                </Link>
            }
            <Button variant="contained" color="secondary"
                onClick={handleShoppingList}>Add to ShoppingList</Button>

        </div>
    )
}

export default RecipeDetails;
