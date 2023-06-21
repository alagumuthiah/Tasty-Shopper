import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

const RecipeIngredient = sequelize.define("recipeIngredient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'User' }
    },
    recipeId: {
        type: DataTypes.INTEGER,
        references: { model: 'Recipe' }
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        references: { model: 'Ingredient' }
    },
    unitId: {
        type: DataTypes.INTEGER,
        references: { model: 'Unit' }
    },
    quantity: {
        type: DataTypes.FLOAT
    }
})
