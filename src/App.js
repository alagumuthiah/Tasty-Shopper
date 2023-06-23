import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutComponent from './components/AboutComponent';
import MyRecipes from './components/MyRecipes';
import OtherRecipes from './components/OtherRecipes';
import RecipeDetails from './components/RecipeDetails';
import NavBar from './components/NavBar';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import FormComponent from './components/FormComponent';

function App() {
  return (

    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<MyRecipes />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/otherrecipes" element={<OtherRecipes />} />
        <Route path="/recipe/details" element={<RecipeDetails />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/create/recipe" element={<FormComponent />} />
        <Route path="/update/recipe/:recipeId" element={<FormComponent />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
