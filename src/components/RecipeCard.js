import { Card, CardActionArea,CardMedia, CardContent, Typography } from "@mui/material"
import {Link} from 'react-router-dom';

export default function RecipeCard(props){
  console.log(props);
  const imgUrl = "https://source.unsplash.com/EzH46XCDQRY";
    return(
      <Link to={`/recipe/details`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth:300 , maxHeight:350}}>
      <CardActionArea>
          <CardMedia sx={{ maxHeight:150}} component="img" image={imgUrl} alt = {props.recipe.title}/>
          <CardContent>
              <Typography variant="h4"> {props.recipe.title}</Typography>
              <Typography variant="body"> {props.recipe.servings} </Typography>
          </CardContent>
      </CardActionArea>

  </Card>
  </Link>
    )
}
