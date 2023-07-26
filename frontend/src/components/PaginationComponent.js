/* Pagination is a component
- it will be used in Home , My Recipes and Other Recipes
- It has to be placed at the bottom of the page as footer
- Pagination will appear only when filterRecipes has some data - check the length and display
- Pagination - count will start with 5
- Pagination has to be controlled, clicking on a page - should set the Page number in the store - call the API with the query params by accessing the page number stored in the store
- When there is a change in the page number, API call has to be made (use it as dependency array)
- The page has to be loaded with Recipes, after search string the filtered recipes are displayed
*/

import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Pagination } from "@mui/material";
import { setPageNumber } from '../store/myRecipes';
import { setPublicRecipePageNumber } from '../store/publicRecipes';
function PaginationComponent() {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleChange = (event, page) => {
        console.log(page);
        console.log(location);
        let calledFrom = location.pathname;
        if (calledFrom === '/myrecipes') {
            dispatch(setPageNumber(page));
        } else {
            dispatch(setPublicRecipePageNumber(page));
        }

    };

    return (
        <Pagination className="pagination-footer" count={5} color="primary" onChange={handleChange}></Pagination>
    )
};

export default PaginationComponent;
