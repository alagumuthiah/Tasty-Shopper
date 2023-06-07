import { Card, CardActionArea,CardMedia, CardContent, Typography } from "@mui/material"

export default function RecipeCard(props){
    return(

      <Card sx={{ maxWidth:300 , maxHeight:300}}>
      <CardActionArea>
          <CardMedia sx={{ maxHeight:150}} component="img" image={props.recipe.imageUrl} alt = {props.recipe.name}/>
          <CardContent>
              <Typography variant="h4"> {props.recipe.name}</Typography>
              <Typography variant="body"> {props.recipe.author} </Typography>
          </CardContent>
      </CardActionArea>

  </Card>
    )
}
