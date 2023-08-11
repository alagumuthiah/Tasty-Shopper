import React from 'react';
import { useLocation } from 'react-router-dom';
var convert = require('convert-units');

const GroceryList = () => {
    const location = useLocation();
    let ingredientObj = {};
    let shoppingItems = location.state.itemsList;
    let servingsArray = location.state.servingsArray;
    console.log('Start');
    console.log(shoppingItems);
    console.log(servingsArray);
    shoppingItems.map((item, itemIndex) => {
        let currServings = item.servings;
        let ingredientsList = item.Ingredients;
        for (let index = 0; index < ingredientsList.length; index++) {
            let curIngredient = ingredientsList[index];
            let name = curIngredient.name;
            let currQuantity = curIngredient.RecipeIngredient.quantity / currServings; //for converting it to one servings before multiplying the user given servings
            console.log(curIngredient);
            if (curIngredient.RecipeIngredient.unit === 'nos') {
                let qty = (currQuantity * servingsArray[itemIndex]).toFixed(2);
                if (ingredientObj[name] !== undefined) {
                    qty += ingredientObj[name].quantity;
                }
                ingredientObj[name] = { 'quantity': qty, 'unit': curIngredient.RecipeIngredient.unit };
            } else {
                if (ingredientObj[name] === undefined) {
                    let qty = (currQuantity * servingsArray[itemIndex]).toFixed(2);
                    ingredientObj[name] = { 'quantity': qty, 'unit': curIngredient.RecipeIngredient.unit };
                } else {
                    let currUnit = curIngredient.RecipeIngredient.unit;
                    let units = ingredientObj[name].unit;
                    if (currUnit !== units) {
                        let possibilities = convert().from(units).possibilities();
                        if (possibilities.includes(currUnit)) {
                            let convertedQty = (convert(currQuantity).from(currUnit).to(units)).toFixed(2) * servingsArray[itemIndex];
                            let oldQty = ingredientObj[name].quantity;
                            ingredientObj[name] = { 'quantity': oldQty + convertedQty, 'unit': units };
                        }

                    }
                }
            }


        }

    });
    console.log(ingredientObj);
    let keys = Object.keys(ingredientObj);
    //for converting it to the best unit (like grams to kgs)
    for (let index = 0; index < keys.length; index++) {
        let curIngredient = ingredientObj[keys[index]];
        let qty = curIngredient.quantity;
        let unit = curIngredient.unit;
        const convertedObj = convert(qty).from(unit).toBest();
        ingredientObj[keys[index]] = { 'quantity': convertedObj.val, 'unit': convertedObj.unit };
    }
    console.log(ingredientObj);

    return (
        Object.keys(ingredientObj).map((key, index) => {
            return (
                <ul>
                    <li> <strong>{key}</strong> : {ingredientObj[key].quantity} {ingredientObj[key].unit}</li>
                </ul>

            )
        })

    )

}

export default GroceryList;
