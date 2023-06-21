import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

/*
id -> primary key
name -> varchar - name of the ingredient
*/
const Ingredient = sequelize.define("ingredient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

Ingredient.sync().then(() => {
    console.log("Ingredient model created");
})

export default Ingredient;
