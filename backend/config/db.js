import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('recipe_app', 'postgres', 'alagu123', {
    host: 'localhost',
    dialect: 'postgres'
});

export const testDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Aunthenticated and connection set up is successful");
    } catch (error) {
        console.log("Unable to connect to the database", error);
    }
}
