import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

// enum - Unit (instead of table)
// Recipe belongstoMany Ingredients;
/*check how to store Image file type in sequelize
Recipe belongsToUser*/

const Recipe = sequelize.define(
    "Recipe", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cuisine: {
        type: DataTypes.STRING(30),
    },
    servings: {
        type: DataTypes.INTEGER
    },
    isPublic: {
        type: DataTypes.BOOLEAN
    },
    instructions: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}
)

Recipe.associate = (models) => {
    Recipe.belongsTo(models.User);
    Recipe.belongsToMany(models.Ingredient, { through: 'RecipeIngredient' });
}

export default Recipe;
