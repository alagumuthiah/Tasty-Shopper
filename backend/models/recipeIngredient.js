import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

const units = ["cup", "teaspoon", "tablespoon", "ml", "liters", "grams", "kilograms", "oz"];
const RecipeIngredient = sequelize.define("RecipeIngredient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    recipeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Recipes',
            key: 'id'
        }
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Ingredients',
            key: 'id'
        }
    },
    unit: {
        type: DataTypes.ENUM(units)
    },
    quantity: {
        type: DataTypes.FLOAT
    }
})

export default RecipeIngredient;
