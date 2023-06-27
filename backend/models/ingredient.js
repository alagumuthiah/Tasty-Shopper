import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

/*
id -> primary key
name -> varchar - name of the ingredient
Ingredients belongstoMany Recipes
*/
const Ingredient = sequelize.define('Ingredient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})

/*Ingredient.sync().then(() => {
    console.log("Ingredient model created");
})*/
//associations

Ingredient.associate = () => {
    Ingredient.belongsToMany(Recipes, { through: 'RecipeIngredient' });
}

export default Ingredient;
