import Joi from 'joi';

let recipeSchema = Joi.object().keys({
    title: Joi.string().required(),
    servings: Joi.number().required(),
    cuisine: Joi.string()
        .valid('Indian', 'Mexican', 'Thai', 'Italian', 'American', 'Korean', 'Vietnamese').required(),
    isPublic: Joi.boolean().required(),
    instruction: Joi.array()
        .items(Joi.string()).min(1).required(),
    userId: Joi.number().required(),
    ingredients: Joi.array()
        .items({
            name: Joi.string().required(),
            quantity: Joi.number().required(),
            unit: Joi.string().valid('cup', 'tsp', 'Tbs', 'ml', 'l', 'g', 'kg', 'nos').required()
        }).min(1).required(),
    recipeImg: Joi.object()
});

let userSignUpSchema = Joi.object().keys({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
});

let userLoginSchema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required()
});

let schemaMapping = {
    'recipeSchema': recipeSchema,
    'userLoginSchema': userLoginSchema,
    'userSignUpSchema': userSignUpSchema
}

export const requestBodyValidation = (reqBody, schema) => {
    if (schemaMapping[schema]) {
        const result = schemaMapping[schema].validate(reqBody);
        const { error } = result;
        if (error) {
            return error.details[0];
        }
    } else {
        return { 'message': 'No matching schema found' }
    }
}
