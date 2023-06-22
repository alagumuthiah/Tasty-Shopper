import { useLocation } from "react-router-dom";

function RecipeDetails() {
    const location = useLocation();
    //the variable passed as a state from the component can be accessed with the state and destructured with the same name given as a key
    const { selectedRecipe } = location.state;
    let instructions = selectedRecipe.instructions.split(".");
    let ingredients = selectedRecipe.ingredients.split('|');
    instructions.pop(); //when we split with "." as a delimiter- the last entry is an empty string. So poppingthe last element form the splitted array
    return (
        <div>
            <h1>Recipe Details</h1>
            <h2>Recipe Title:{selectedRecipe.title}</h2>
            <h3>Ingredients</h3>
            <ol>
                {ingredients.map((ingredient) => {
                    return <li>{ingredient}</li>
                })}
            </ol>
            <h3>Steps & Instruction</h3>
            <ul>
                {instructions.map((instruction) => {
                    return <li>{instruction}</li>
                })}
            </ul>
        </div>
    )
}

export default RecipeDetails;
