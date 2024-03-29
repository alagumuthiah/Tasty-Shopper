import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/session';
import { resetMyRecipes } from "../store/myRecipes";
import { resetPublicRecipes } from "../store/publicRecipes";
import { logOutUser } from "../utils/fetchData";

function NavBar() {
    const dispatch = useDispatch();
    const userAuthentication = useSelector((state) => state.userInfo);

    console.log(userAuthentication);

    const handleLogOut = () => {
        logOutUser('/users/logout')
            .then((res) => {
                if (res.data.hasOwnProperty("Error")) {
                    alert(` Error: ${res.data.Error}`);
                } else {
                    console.log(res.data);
                    sessionStorage.removeItem('access-token');
                    dispatch(resetMyRecipes());
                    dispatch(resetPublicRecipes());
                    dispatch(logout());
                }
            })
    }
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

                    {userAuthentication?.isLogged ?
                        <Button size="medium" color="primary" variant="contained" onClick={handleLogOut} >Logout</Button>
                        :
                        <Link to="/login">
                            <Button size="medium" color="primary" variant="contained">Login</Button>
                        </Link>}
                    {userAuthentication?.firstName.length !== 0 && userAuthentication?.firstName}
                    {userAuthentication?.lastName.length !== 0 && userAuthentication?.lastName}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
