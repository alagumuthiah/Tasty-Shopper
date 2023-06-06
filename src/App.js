import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import AboutComponent from './components/AboutComponent';
import RecipePage from './components/RecipePage';
import RecipeDetails from './components/RecipeDetails';
import NavBar from './components/NavBar';

function App() {
  return (

    <BrowserRouter>
      <header>
            <NavBar/>
      </header>
      <Routes>
        <Route path="/" element={<RecipePage/>}/>
        <Route path="/about" element={<AboutComponent/>}/>
        <Route path="/recipes" element={<RecipePage/>}/>
        <Route path="/recipe/:id" element={<RecipeDetails/>}/>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
