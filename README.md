## Overview

**`Tasty Shopper`** is a Repository of Recipes where users can create their own custom recipes and also view recipes uploaded by other users. It also supports creating a grocery list basically a pantry planner by selecting recipes.

## Tasty Shopper Application

This Application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tasty Shopper Setup

To run this Application locally:

1. Git clone the repo `https://github.com/alagumuthiah/Tasty-Shopper.git`
2. Run `npm install` in both frontend and backend folders to install the required packages for the application.
3. Create a .env file with the configuration for the database.
4. Include jwt secret and expiration time in the .env file.
5. Create the database using sequelize - `npx sequelize db:create`
6. Run `npx sequelize db:migrate` to migrate the database.
7. Run `npx sequelize db:seed:all` to seed the database(populate the data)
8. Install a Redis server using `brew install redis`.
9. Start the redis server using the command - ` brew services start redis`
10. Run npm start in the backend folder to start our Express server.
11. run npm start in the frontend folder to start the React frontend server.
12. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Technologies Used

- React
- Redux
- HTML
- CSS
- JSX
- Javascript
- Express
- Node JS
- PostgreSQL
- Sequelize
- Redis

## Features of the App

- Users can create an account(sign up), login to their account and log out.
- Users can create their own Recipes.
- Users can edit their Recipes.
- Users can delete the recipes that they created.
- Users can view their own recipes and view recipes fetched from external API
- Recipes has a search functionality with the query string.
- Users can view custom recipes created by other users if the custom recipes are made public.
- Recipes are fetched from an external API [ninjas-API](https://api-ninjas.com/api/recipe)
- Allow authorization of users using JSON web tokens
- Compute the grocery list for a week by selecting the recipes to cook for the week

## To do features

- Provide a random dish based on tags(breakfast, dinner, etc)
- Add option in the other recipes (from external API), it will be added to my recipes and shopping list
- Calculate the calorie of a recipe with the nutrition API

## Dependecies for the Application

- Material UI - for the UI components (NavBar,Card)
- Redux - for central store state management
- convert-units - npm modules for unit conversion

<!---# Steps to test and build the application

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information. -->

## Link to Wiki docs

[Link to Wiki Docs] (https://github.com/alagumuthiah/Tasty-Shopper/wiki)
