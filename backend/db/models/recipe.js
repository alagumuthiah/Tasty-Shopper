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
      Recipe.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
      Recipe.belongsToMany(models.Ingredient, { through: models.RecipeIngredient });
    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    cuisine: {
      type: DataTypes.ENUM,
      values: ['French', 'Chinese', 'Japanese', 'Italian', 'Indian', 'Mexican', 'Thai', 'American', 'Lebanese', 'Korean', 'Greek']
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
