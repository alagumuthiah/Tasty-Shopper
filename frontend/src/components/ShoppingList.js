import React from "react";
import { shoppingListOperations } from "../shared/fetchData";
import { modifyShoppingList } from "../shared/modifyData";
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from "@mui/material";
import { setItems, resetItems } from "../store/shoppingListItems";
//To store the shopping data in database, Clear shopping list button - to delete the shopping list
function ShoppingList() {
    const shoppingListItems = useSelector((state) => state.shoppingList);
    const [servingsArray, setServingsArray] = React.useState([]);
    const dispatch = useDispatch();

    const deleteItem = (id) => {
        console.log(id);
        const uri = `/shoppingList/${id}`;
        const response = modifyShoppingList(uri, 'delete');
        console.log(response);
        response
            .then((shoppingList) => {
                console.log(shoppingList);
                dispatch(setItems(shoppingList.data));
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const handleClearList = () => {
        console.log('Clear list');
        const uri = '/shoppingList';
        const response = shoppingListOperations(uri, 'delete');
        response
            .then((data) => {
                console.log(data);
                dispatch(resetItems());
            })
            .catch((error) => {
                console.log('Error');
            })
    }

    const handleServingsChange = (event, index) => {
        console.log(event, index);
        console.log(event.target.value);
        //console.log(servingsArray);
        // setServingsArray(
        //     [...servingsArray,
        //     servingsArray[index] = event.target.value]
        // );

    }
    const handleComputeItemsList = () => {
        console.log('Compute groceries List');
    }

    React.useEffect(() => {
        console.log('useEffect');
        const uri = '/shoppingList'
        const response = shoppingListOperations(uri, 'get');
        response
            .then((shoppingListData) => {
                if (shoppingListData.data.hasOwnProperty('Error')) {
                    alert(shoppingListData.data.Error);
                } else {
                    console.log(shoppingListData.data);
                    dispatch(setItems(shoppingListData.data));
                    console.log(shoppingListItems);
                }
            })
            .catch((error) => {
                console.log(`Error:${error}`);
            })

    }, []);

    const listOfShoppingItems = shoppingListItems.length > 0 ?

        shoppingListItems.map((item, index) => {
            return (
                <div className="spaced-element">
                    <h2>{item.title}</h2>
                    <h4>{item.cuisine}</h4>
                    <TextField
                        id="servings"
                        name="servings"
                        type="number"
                        label="Servings"
                        onChange={((event) => {
                            handleServingsChange(event, index)
                        })}
                        value={servingsArray[index]}
                    />
                    <Button type="button" variant="contained" onClick={() => deleteItem(item.id)}>Delete</Button>
                </div>
            )
        })
        :
        <h3>There are no items in the shopping list</h3>


    return (
        <>
            <h1>Shopping List</h1>
            {shoppingListItems.length > 0 &&
                <Button type="button" variant="contained" onClick={handleClearList}>Clear Shopping List</Button>
            }
            {listOfShoppingItems}
            {shoppingListItems.length > 0 &&
                <Button type="button" variant="contained" onClick={handleComputeItemsList}>Compute Items List</Button>}

        </>


    )
}

export default ShoppingList;
