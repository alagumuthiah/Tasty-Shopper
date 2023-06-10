import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AboutComponent from './components/AboutComponent';
import RecipePage from './components/RecipePage';
import RecipeDetails from './components/RecipeDetails';
import NavBar from './components/NavBar';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';

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
        <Route path="/login" element={<LoginComponent/>}/>
        <Route path="/signup" element={<SignUpComponent/>}/>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
