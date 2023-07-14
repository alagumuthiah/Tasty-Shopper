import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/session';

function NavBar() {

    const isAuthenticated = useSelector((state) => state.isLogged.value);
    const firstName = useSelector((state) => state.isLogged.firstName);
    const lastName = useSelector((state) => state.isLogged.lastName);
    const dispatch = useDispatch();
    console.log(isAuthenticated);
    console.log(firstName);
    return (
        <div className="nav--bar">
            <AppBar position="static" sx={{ bgcolor: "#5ab1bb" }}>
                <Toolbar className="nav--items">
                    <div className="nav--links">
                        <Link className="link--navbar" to="/">
                            <Typography>Home</Typography>
                        </Link>
                        <Link className="link--navbar" to="/myrecipes">
                            <Typography>My Recipes</Typography>
                        </Link>
                        <Link className="link--navbar" to="/about">
                            <Typography>About</Typography>
                        </Link>
                        <Link className="link--navbar" to="/otherrecipes">
                            <Typography>Other Recipes</Typography>
                        </Link>
                        <Link className="link--navbar" to="/shoppinglist">
                            <Typography>Shopping List</Typography>
                        </Link>
                    </div>

                    {isAuthenticated ?
                        <Button size="medium" color="primary" variant="contained" onClick={() => dispatch(logout())} >Logout</Button>
                        :
                        <Link to="/login">
                            <Button size="medium" color="primary" variant="contained">Login</Button>
                        </Link>}
                    {firstName.length !== 0 && firstName}
                    {lastName.length !== 0 && lastName}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
