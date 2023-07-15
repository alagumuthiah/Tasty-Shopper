import { Card, CardActionArea, CardMedia, CardContent, Typography, Stack } from "@mui/material"
import { Link } from 'react-router-dom';

export default function RecipeCard(props) {
  console.log(props);
  const imgUrl = "https://source.unsplash.com/EzH46XCDQRY";
  return (
    <Link to={`/recipe/details`} state={{ selectedRecipe: props.recipe }} style={{ textDecoration: 'none' }}>
      <Card className="card-class">
        <CardActionArea>
          <CardMedia sx={{ maxHeight: 150 }} component="img" image={imgUrl} alt={props.recipe.title} />
          <CardContent sx={{ maxHeight: 120 }}>
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
