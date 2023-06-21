# Alagu's Recipe Application

This Application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Steps to run the Application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Technologies Used

- React
- Javascript
- HTML
- CSS

# Features of the App

- Users can create an account(sign up), login to their account and log out.
- Users can create their own Recipes.
- Users can edit their Recipes.
- Users can delete the recipes that they created.
- Users can view their own recipes and view recipes fetched from external API
- Recipes has a search functionality with the query string.
- Users can view custom recipes created by other users if the custom recipes are made public.
- Recipes are fetched from an external API [ninjas-API](https://api-ninjas.com/api/recipe)
- Allow authorization of users using OAuth and JSON web tokens

# To do features

- Provide a random dish based on tags(breakfast, dinner, etc)
- Compute the grocery list for a week by selecting the recipes to cook for the week
- Calculate the calorie of a recipe with the nutrition API

# Dependecies for the Application

- Material UI - for the UI components (NavBar,Card)

# Database Schema

### User

- id  -> primary key
- username -> varchar
- firstname -> varchar
- lastname -> varchar
- email -> varchar
- password -> varchar

### Recipe

- id -> primary key
- title -> varchar(30)
- cuisine -> varchar(15)
- servings -> number
- isPublic -> boolean
- instructions

### Ingredient

- id -> primary key
- name -> varchar - name of the ingredient

### Unit

- id -> primary key
- name -> varchar (Unit- cup, tablespoon, spoon, ml, grams)

### RecipeIngredient

- id -> primary key
- recipeId -> foreign key references Recipe
- ingredientId -> foreign key references Ingredients
- quantity - float
- unitId - foreign key references Units

Multiple entries in RecipeIngredient table for a recipe

# Steps to test and build the application

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
