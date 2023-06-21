import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

const Unit = sequelize.define("unit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    unitType: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
})

export default Unit;
