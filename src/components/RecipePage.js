
import RecipeCard from "./RecipeCard";

function RecipePage(){
    const recipeArray =[
        {
            image:"",
            name:"ABC juice",
            author:"Alagu Muthiah"
        },
        {
            image:"",
            name:"Ash gourd Juice",
            author:"Vignesh Subramanian"
        },
        {
            image:"",
            name:"ABC juice",
            author:"Alagu Muthiah"
        },
        {
            image:"",
            name:"Ash gourd Juice",
            author:"Vignesh Subramanian"
        },
        {
            image:"",
            name:"ABC juice",
            author:"Alagu Muthiah"
        },
        {
            image:"",
            name:"Ash gourd Juice",
            author:"Vignesh Subramanian"
        }
    ]
    const recipeCards = recipeArray.map((recipe)=>{
        return(
            <RecipeCard recipe={recipe}/>
        )
    })
    return(
        <div>
            <h1>Recipe Page</h1>
            <div className="card--div">
                {recipeCards}
            </div>
        </div>
    )
}

export default RecipePage;