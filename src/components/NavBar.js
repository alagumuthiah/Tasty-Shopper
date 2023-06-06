
import {Link} from "react-router-dom";

function NavBar(){
    return(
        <div>
           <Link to="/">Home</Link>
           <Link to="/recipes">My Recipes</Link>
           <Link to="/about">About</Link>
           <Link to="/recipe/:id">Other Recipes</Link>
        </div>
    )
}

export default NavBar;
