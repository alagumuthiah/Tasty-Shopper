import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

const Recipe = sequelize.define(
    "recipe", {
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
    }
}
)


export default Recipe;
