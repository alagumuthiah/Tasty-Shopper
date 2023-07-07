'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.User, { foreignKey: 'userId' });
      Recipe.belongsToMany(models.Ingredient, { through: models.RecipeIngredient });
    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    cuisine: {
      type: DataTypes.ENUM,
      values: ['Indian', 'Mexican', 'Thai', 'Italian', 'American', 'Korean', 'Vietnamese']
    },
    servings: DataTypes.INTEGER,
    isPublic: DataTypes.BOOLEAN,
    instruction: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};
