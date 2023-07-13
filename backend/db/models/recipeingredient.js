'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RecipeIngredient.init({
    unit: {
      type: DataTypes.ENUM,
      values: ['cup', 'teaspoon', 'tablespoon', 'ml', 'liters', 'grams', 'kilograms', 'oz', 'number']
    },
    quantity: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'RecipeIngredient',
  });
  return RecipeIngredient;
};
