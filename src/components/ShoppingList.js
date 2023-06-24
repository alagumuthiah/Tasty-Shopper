
function ShoppingList() {
    const list = JSON.parse(localStorage.getItem("shoppingList") || "[]");
    const listOfShoppingItems = list.length > 0 ?
        <ul>
            {list.map((item) => {
                return <li>{item}</li>
            })
            }
        </ul> :
        <h3>There are no items in the shopping list</h3>


    return (
        <>
            <h1>Shopping List</h1>
            {listOfShoppingItems}
        </>

    )
}

export default ShoppingList;
