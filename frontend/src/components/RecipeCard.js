import { Card, CardActionArea, CardMedia, CardContent, Typography, Stack } from "@mui/material"
import { Link } from 'react-router-dom';
import { baseUrl } from "../utils/baseUrl";

export default function RecipeCard(props) {
  console.log(props);
  console.log('inside recipe card');
  //it is called twice - CHECK!!!
  let imgUrl = "https://source.unsplash.com/EzH46XCDQRY";
  if (props.recipe.image !== null) {
    imgUrl = `${baseUrl}/uploads/${props.recipe.image}`;
  }
  //const imgUrl = `${baseUrl}/uploads/${props.recipe.image}`;
  console.log(imgUrl);
  return (
    <Link to={`/recipe/details`} state={{ selectedRecipe: props.recipe }} style={{ textDecoration: 'none' }}>
      <Card className="card-class" >
        <CardActionArea>
          <CardMedia sx={{ maxHeight: 170 }} component="img" image={imgUrl} alt={props.recipe.title} />
          <CardContent sx={{ minHeight: 170 }}>
            <Stack>
              <Typography variant="h5"> {props.recipe.title}</Typography>
              <Typography variant="body"> {props.recipe.cuisine} </Typography>
              <Typography variant="body">{props.recipe.User?.firstName} {props.recipe.User?.lastName}</Typography>
            </Stack>

          </CardContent>
        </CardActionArea>

      </Card>
    </Link>
  )
}
