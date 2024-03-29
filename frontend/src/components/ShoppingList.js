import React from "react";
import { shoppingListOperations } from "../utils/fetchData";
import { modifyShoppingList } from "../utils/modifyData";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button } from "@mui/material";
import { setItems, resetItems } from "../store/shoppingListItems";
import { baseUrl } from "../utils/baseUrl";
//To store the shopping data in database, Clear shopping list button - to delete the shopping list
function ShoppingList() {
    const shoppingListItems = useSelector((state) => state.shoppingList);
    const [servingsArray, setServingsArray] = React.useState([]);
    const dispatch = useDispatch();
    const deleteItem = (id, index) => {
        console.log(id);
        const uri = `/shoppingList/${id}`;
        const response = modifyShoppingList(uri, 'delete');
        console.log(response);
        response
            .then((shoppingList) => {
                console.log(shoppingList);
                handleServingsDelete(index)
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

    const handleServingsDelete = (index) => {
        let servingQty = [...servingsArray];
        servingQty.splice(index, 1);
        setServingsArray(servingQty);
    }

    const handleServingsChange = (event, index) => {
        let servingQty = [...servingsArray];
        servingQty[index] = event.target.value;
        setServingsArray(servingQty);
    }

    const checkServingsArray = () => {
        for (let index = 0; index < servingsArray.length; index++) {
            if (servingsArray[index] <= 0) {
                alert('Servings cannot be negative');
                return false;
            }
        }
        return true;
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
            let imgUrl = "https://source.unsplash.com/EzH46XCDQRY";
            if (item.image !== null) {
                imgUrl = `${baseUrl}/uploads/${item.image}`;
            }
            return (
                <div className="spaced-element">
                    <div className="shoppingList__container">
                        <div className="shoppingList__items">
                            <h2>{item.title}</h2>
                            <h4>{item.cuisine}</h4>
                        </div>
                        <div className="shoppingList__img">
                            <img className="recipe__image__small" src={imgUrl} alt={item.title} />
                        </div>
                    </div>

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
                    <Button type="button" variant="contained" onClick={() => deleteItem(item.id, index)}>Delete</Button>
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
            {shoppingListItems.length > 0 && checkServingsArray() &&
                <Link to={`/groceryList`} state={{ itemsList: shoppingListItems, servingsArray: servingsArray }} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" type="submit">Compute Items List</Button>
                </Link>
            }
        </>
    )
}

export default ShoppingList;
