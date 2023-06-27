import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
    const isAuthenticated = true;

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
                    {isAuthenticated &&
                        <Link to="/login">
                            <Button size="medium" color="primary" variant="contained" >Login</Button>
                        </Link>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
