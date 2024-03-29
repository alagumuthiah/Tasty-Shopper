import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { TextField, Typography, Button, FormControl, Select, MenuItem, FormLabel, Radio, RadioGroup, FormControlLabel, Divider } from '@mui/material';
import { units, cuisineOptions } from '../data/sampleSharedData';
import { useSelector, useDispatch } from 'react-redux';
import { listIngredients } from '../store/ingredients';
import { fetchIngredients } from '../utils/fetchData';
import { FieldArray, Formik, Form, getIn } from 'formik';
import * as Yup from 'yup';
import { modifyRecipeData } from '../utils/modifyData';

//Does using separate delete buttons causes re render of the text areas for instructions
//why useParams is called everytime when I change the input fields

let defaultValues;

const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Title of the recipe has to be atleast 3 charcaters')
        .max(40, 'Title cannot be more than 40 characters')
        .required('Title is required for the recipe'),
    servings: Yup.number()
        .required('Serving is a required field'),
    cuisine: Yup.mixed()
        .required('Cuisine is required')
        .oneOf(cuisineOptions, 'Invalid value for cuisine'),
    isPublic: Yup.mixed()
        .required('This field is required')
        .oneOf(['Yes', 'No'], 'Has to be either Yes or No'),
    instruction: Yup.array()
        .of(Yup.string()),
    ingredients: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            quantity: Yup.number().required('Required')
        })
    )
});


const FormComponent = () => {
    let initialValues = {
        title: '',
        servings: '',
        cuisine: '',
        instruction: [''],
        isPublic: '',
        ingredients: [
            {
                name: '', quantity: '', unit: ''
            }
        ]
    }
    const userInfo = useSelector((state) => state.userInfo);
    const ingredientList = useSelector((state) => state.ingredients);
    const dispatch = useDispatch();
    const location = useLocation(); //to get the data passed from update component
    const navigate = useNavigate();
    if (location.state !== null) {
        console.log(location.state);
        const { updateRecipe } = location.state;
        console.log(updateRecipe);
        const ingredients = updateRecipe.Ingredients.map((ingredient) => {
            return { "name": ingredient.name, "quantity": ingredient.RecipeIngredient.quantity, "unit": ingredient.RecipeIngredient.unit };
        })
        defaultValues = {
            title: updateRecipe.title,
            servings: updateRecipe.servings,
            cuisine: updateRecipe.cuisine,
            instruction: updateRecipe.instruction,
            isPublic: updateRecipe.isPublic ? 'Yes' : 'No',
            ingredients: ingredients
        }
    } else {
        defaultValues = initialValues;
    }

    React.useEffect(() => {
        const response = fetchIngredients('/ingredients');
        response
            .then((ingredientData) => {
                dispatch(listIngredients(ingredientData));
            })
            .catch((error) => {
                console.log('Error', error);
            })
    }, []);

    const handleButtonClick = (values) => {
        console.log('submit button');
        if (location.pathname === '/create/recipe') {
            let uri = `/recipes/`
            values.userId = userInfo.userId;
            values.isPublic = (values.isPublic === 'Yes') ? true : false;
            console.log(values.recipeImg);
            let response = modifyRecipeData(uri, values, 'post');
            response
                .then((recipeData) => {
                    if (recipeData.hasOwnProperty("Error")) {
                        alert(` Error: ${recipeData.Error}`);
                    } else {
                        alert('Recipe successfully created');
                        navigate('/recipe/details', { state: { 'selectedRecipe': recipeData.data } })
                    }
                })
                .catch((error) => {
                    alert('Internal Server Error');
                });
        }
        else {
            let path = location.pathname.split('/');
            let recipeId = path[path.length - 1];
            values.userId = userInfo.userId;
            values.isPublic = (values.isPublic === 'Yes') ? true : false;
            let uri = `/recipes/${recipeId}`;
            let response = modifyRecipeData(uri, values, 'put');
            response
                .then((recipeUpdateData) => {
                    if (recipeUpdateData.hasOwnProperty("Error")) {
                        alert(` Error: ${recipeUpdateData.Error}`);
                    } else {
                        alert('Recipe successfully updated');
                        navigate('/recipe/details', { state: { 'selectedRecipe': recipeUpdateData.data } });
                    }
                })
                .catch((error) => {
                    alert(`Internal Server Error): ${error}`);
                });
        }
    }

    return (
        <div>
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                encType="multipart/form-data"
                onSubmit={values => {
                    handleButtonClick(values);
                    console.log(values);
                    //alert(JSON.stringify(values, null, 2));
                }}

            >
                {({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
                    <Form className="form-section" noValidate>
                        <div className='spaced-element'>
                            <Typography>{location.state ? 'Update Recipe' : 'Create Recipe'}</Typography>
                        </div>
                        <div className="spaced-element">
                            <TextField
                                name="title"
                                type="text"
                                onChange={handleChange}
                                label="Title"
                                value={values.title}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                            />
                        </div>
                        <div className="spaced-element">
                            <TextField
                                id="servings"
                                name="servings"
                                type="number"
                                onChange={handleChange}
                                label="Servings"
                                value={values.servings}
                                error={touched.servings && Boolean(errors.servings)}
                                helperText={touched.servings && errors.servings} />
                        </div>
                        <div className="spaced-element">
                            <FormControl>
                                <Select
                                    id="cuisine"
                                    name="cuisine"
                                    onChange={handleChange}
                                    label="Cuisine"
                                    value={values.cuisine}
                                    error={touched.cuisine && Boolean(errors.cuisine)}
                                    helperText={touched.cuisine && errors.cuisine}
                                >
                                    {cuisineOptions.map((cuisine, index) => {
                                        return (
                                            <MenuItem key={index} value={cuisine}>{cuisine}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <label> Upload File</label>
                            <input
                                type="file"
                                name="recipeImg"
                                accept="image/*"
                                onChange={(event) => {
                                    setFieldValue("recipeImg", event.currentTarget.files[0]);
                                }}
                                values={values.recipeImg}
                            />
                        </div>

                        <div className="spaced-element">

                            <FormLabel>Do you want to make it public?</FormLabel>
                            <RadioGroup name="isPublic" value={values.isPublic} onChange={handleChange} error={touched.isPublic && Boolean(errors.isPublic)}
                                helperText={touched.isPublic && errors.isPublic}>
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No"
                                    control={<Radio />} label="No" />
                            </RadioGroup>

                        </div>
                        <FieldArray name="instruction">
                            {({ push, remove }) => (
                                <div>
                                    {values.instruction.map((ins, index) => {
                                        const instr = `instruction[${index}]`;
                                        const touchedInstruction = getIn(touched, instr);
                                        const errorInstruction = getIn(errors, instr);
                                        return (
                                            <div className="spaced-element" key={index}>
                                                <TextField
                                                    label="Instruction"
                                                    name={instr}
                                                    value={ins}
                                                    helperText={
                                                        touchedInstruction && errorInstruction
                                                            ? errorInstruction
                                                            : ""
                                                    }
                                                    error={Boolean(touchedInstruction && errorInstruction)}
                                                    onChange={handleChange}
                                                />
                                                <Button type="button" variant="contained" onClick={() => remove(index)}>Delete</Button>
                                            </div>
                                        )
                                    }
                                    )}
                                    <Button type="button" variant="contained" onClick={() => push('')
                                    }
                                    >
                                        Add</Button>
                                </div>
                            )}
                        </FieldArray>
                        <FieldArray name="ingredients">
                            {({ push, remove }) => (
                                <div>
                                    {values.ingredients.map((ingredient, index) => {
                                        const name = `ingredients[${index}].name`;
                                        const touchedName = getIn(touched, name);
                                        const errorName = getIn(errors, name);
                                        const quantity = `ingredients[${index}].quantity`;
                                        const touchedQuantity = getIn(touched, quantity);
                                        const errorQuantity = getIn(errors, quantity);
                                        const unit = `ingredients[${index}].unit`;
                                        const touchedUnit = getIn(touched, unit);
                                        const errorUnit = getIn(errors, unit);
                                        return (
                                            <div className="spaced-element" key={index}>
                                                <Select
                                                    name={name}
                                                    label="Name"
                                                    value={ingredient.name}
                                                    error={Boolean(touchedName && errorName)}
                                                    onChange={handleChange}
                                                >
                                                    {ingredientList.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                                <TextField
                                                    label="Quantity"
                                                    name={quantity}
                                                    value={ingredient.quantity}
                                                    helperText={
                                                        touchedQuantity && errorQuantity
                                                            ? errorQuantity
                                                            : ""
                                                    }
                                                    type="number"
                                                    error={Boolean(touchedQuantity && errorQuantity)}
                                                    onChange={handleChange}
                                                />

                                                <Select
                                                    name={unit}
                                                    label="Unit"
                                                    value={ingredient.unit}
                                                    error={Boolean(touchedUnit && errorUnit)}
                                                    onChange={handleChange}
                                                >
                                                    {units.map((unit, index) => {
                                                        return (
                                                            <MenuItem key={index} value={unit}>{unit}</MenuItem>
                                                        )
                                                    })}
                                                </Select>

                                                <Button type="button" variant="contained" onClick={() => remove(index)}>Delete</Button>
                                            </div>
                                        );
                                    }
                                    )}

                                    <Button type="button" variant="contained" onClick={() => push({ name: '', quantity: '', unit: '' })
                                    }
                                    >
                                        Add</Button>

                                </div>
                            )}
                        </FieldArray>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <div>
                            <Button variant="contained" type="submit">{location.state ? `UPDATE` : `CREATE`}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
};

export default FormComponent;
