const recipes = [
    {
        id: 101,
        title: "Potato fry",
        servings: 3,
        cuisine: "Indian",
        instructions: ["Boil Potatoes", "Add Spices", "Roast the potatoes and garnish and serve"],
        ingredients: [{ name: 'Potato', quantity: '200', measurement: 'grams' },
        { name: 'Onion', quantity: '250', measurement: 'grams' },
        { name: 'Tomato', quantity: '300', measurement: 'grams' }],
        image: "",
        isPublic: "Yes"
    },
    {
        id: 102,
        title: "Paneer Burji",
        servings: 2,
        cuisine: "Indian",
        instructions: ["Add Paneer cubes in hot water", "Stir fry capsicum onion and tomato", "Add salt and spices", 'Add the Paneer cubes to the stir fry and garnish with cilantro and serve with chapathi'],
        ingredients: [{ name: 'Paneer', quantity: '200', measurement: 'grams' },
        { name: 'Onion', quantity: '50', measurement: 'grams' },
        { name: 'Tomato', quantity: '100', measurement: 'grams' },
        { name: 'Capsicum', quantity: '1', measurement: 'number' }],
        image: "",
        isPublic: "No"
    },
    {
        id: 103,
        title: "Besan Chilla",
        servings: 1,
        cuisine: "Indian",
        instructions: ["Mix besan flour with water", "Add Onion, tomato and green chillies", "Heat tawa and make chilla by adding 1 teaspoon for one chilla"],
        ingredients: [{ name: 'Besan flour', quantity: '1', measurement: 'cup' },
        { name: 'Onion', quantity: '1', measurement: 'number' },
        { name: 'Tomato', quantity: '1', measurement: 'number' }],
        image: "",
        isPublic: "Yes"
    },
    {
        id: 104,
        title: "Tacos",
        servings: 2,
        cuisine: "Mexican",
        instructions: ["Bake the tacos at 350 F", "Prepare the filling with gardien protein by adding onion, tomato, garlic and spices", "Serve with hummus and salsa"],
        ingredients: [{ name: 'Taco Shells', quantity: '6', measurement: 'number' },
        { name: 'Garlic', quantity: '30', measurement: 'grams' },
        { name: 'Tomato', quantity: '50', measurement: 'grams' }],
        image: "",
        isPublic: "Yes"
    },
    {
        id: 105,
        title: "Red curry",
        servings: 3,
        cuisine: "Thai",
        instructions: ["Make a puree with Onion and Tomato", "Boil the veggies and add the vegetables in the curry", "Serve Red Curry with Jasmine rice"],
        ingredients: [{ name: 'Brocoli', quantity: '200', measurement: 'grams' },
        { name: 'Onion', quantity: '100', measurement: 'grams' },
        { name: 'Tomato', quantity: '150', measurement: 'grams' }],
        image: "",
        isPublic: "No"
    },
    {
        id: 106,
        title: "Chicken Manchurian",
        servings: 2,
        cuisine: "Chinese",
        instructions: ["Marinate the chicken and deep fry", "Prepare the sauce on high flame and add the fried chicken pieces", "Garnish with spring onion and serve hot"],
        ingredients: [{ name: 'Chicken', quantity: '500', measurement: 'grams' },
        { name: 'Chilli sauce', quantity: '2', measurement: 'tbsp' },
        { name: 'Soya sauce', quantity: '2', measurement: 'tbsp' }],
        image: "",
        isPublic: "Yes"
    },
    {
        id: 107,
        title: "Pesto Pasta",
        servings: 3,
        cuisine: "Italian",
        instructions: ["Boil the Pasta shells", "Preapre the Pesto sauce with Basil and Cashew", "Toss the Pesto sauce with Pasta shells "],
        ingredients: [{ name: 'Pasta shells', quantity: '400', measurement: 'grams' },
        { name: 'Basil', quantity: '100', measurement: 'grams' },
        { name: 'Cashew', quantity: '4', measurement: 'tbsp' }],
        image: "",
        isPublic: "No"
    },
    {
        id: 108,
        title: "American Cheese Burger",
        servings: 2,
        cuisine: "American",
        instructions: ["Assemble the burger buns", "Add Cheese, Lettuce, Burger Patty", "Add sauce and serve with french fries"],
        ingredients: [{ name: 'Burger Buns', quantity: '6', measurement: 'number' },
        { name: 'Cheese', quantity: '200', measurement: 'grams' },
        { name: 'Tomato', quantity: '300', measurement: 'grams' },
        { name: 'Lettuce', quantity: '40', measurement: 'grams' }],
        image: "",
        isPublic: "Yes"
    },
    {
        id: 109,
        title: "Potato fry",
        servings: 3,
        cuisine: "Indian",
        instructions: ["Boil Potatoes", "Add Spices", "Roast the potatoes and garnish and serve"],
        ingredients: [{ name: 'Potato', quantity: '200', measurement: 'grams' },
        { name: 'Onion', quantity: '250', measurement: 'grams' },
        { name: 'Tomato', quantity: '300', measurement: 'grams' }],
        image: "",
        isPublic: "Yes"
    },
    {
        id: 110,
        title: "Potato fry",
        servings: 3,
        cuisine: "Indian",
        instructions: ["Boil Potatoes", "Add Spices", "Roast the potatoes and garnish and serve"],
        ingredients: [{ name: 'Potato', quantity: '200', measurement: 'grams' },
        { name: 'Onion', quantity: '250', measurement: 'grams' },
        { name: 'Tomato', quantity: '300', measurement: 'grams' }],
        image: "",
        isPublic: "Yes"
    }
]

export default recipes;

// [
//     {
//         "title": "PaneerCurry",
//         "cuisine": "Indian",
//         "servings": 3,
//         "isPublic": true,
//         "instruction": [
//             "Wash the Paneer and cut into cubes",
//             "Add the spices tomato and onion"
//         ],
//         "User": {
//             "firstName": "John",
//             "lastName": "Doe",
//             "userName": "johndoe"
//         },
//         "Ingredients": [
//             {
//                 "name": "Paneer",
//                 "RecipeIngredient": {
//                     "unit": "grams",
//                     "quantity": 300
//                 }
//             },
//             {
//                 "name": "Onion",
//                 "RecipeIngredient": {
//                     "unit": "grams",
//                     "quantity": 50
//                 }
//             },
//             {
//                 "name": "Tomato",
//                 "RecipeIngredient": {
//                     "unit": "grams",
//                     "quantity": 100
//                 }
//             }
//         ]
//     },
//     {
//         "title": "Paruppu Payasam",
//         "cuisine": "Indian",
//         "servings": 4,
//         "isPublic": true,
//         "instruction": [
//             "Boil the mong dal",
//             "Make the jaggery syrup add coconut milk",
//             "Add the cooked dal",
//             "Season it with nuts"
//         ],
//         "User": {
//             "firstName": "Venkatesh",
//             "lastName": "Bhat",
//             "userName": "venkatbhat"
//         },
//         "Ingredients": [
//             {
//                 "name": "Moong Dal",
//                 "RecipeIngredient": {
//                     "unit": "grams",
//                     "quantity": 200
//                 }
//             },
//             {
//                 "name": "Jaggery",
//                 "RecipeIngredient": {
//                     "unit": "cup",
//                     "quantity": 1
//                 }
//             }
//         ]
//     },
//     {
//         "title": "Paruppu Payasam567",
//         "cuisine": "Indian",
//         "servings": 4,
//         "isPublic": true,
//         "instruction": [
//             "Boil the mong dal",
//             "Make the jaggery syrup add coconut milk",
//             "Add the cooked dal",
//             "Season it with nuts"
//         ],
//         "User": {
//             "firstName": "Venkatesh",
//             "lastName": "Bhat",
//             "userName": "venkatbhat"
//         },
//         "Ingredients": [
//             {
//                 "name": "Moong Dal",
//                 "RecipeIngredient": {
//                     "unit": "grams",
//                     "quantity": 200
//                 }
//             },
//             {
//                 "name": "Jaggery",
//                 "RecipeIngredient": {
//                     "unit": "cup",
//                     "quantity": 1
//                 }
//             }
//         ]
//     },
//     {
//         "title": "Tom yum Soup",
//         "cuisine": "Thai",
//         "servings": 2,
//         "isPublic": true,
//         "instruction": [
//             "Boil all the vegetables",
//             "Season the broth and vegetables with chilli flakes"
//         ],
//         "User": {
//             "firstName": "Venkatesh",
//             "lastName": "Bhat",
//             "userName": "venkatbhat"
//         },
//         "Ingredients": []
//     },
//     {
//         "title": "Paneer Burji",
//         "cuisine": "Indian",
//         "servings": 2,
//         "isPublic": true,
//         "instruction": [
//             "Shred the Paneer",
//             "Add Onion, Tomato and masala",
//             "Garnish"
//         ],
//         "User": {
//             "firstName": "Dhamodharan",
//             "lastName": "Chef",
//             "userName": "dhamuchef"
//         },
//         "Ingredients": []
//     }
// ]
