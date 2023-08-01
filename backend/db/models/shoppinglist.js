'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShoppingList.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
    }
  }

  ShoppingList.init({
    recipeList: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'ShoppingList',
  });
  return ShoppingList;
};
