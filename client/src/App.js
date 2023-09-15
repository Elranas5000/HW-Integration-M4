import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About';
import Detail from "./components/Detail"
import Form from './components/Form';
import Favorites from './components/Favorites';

function App() {

   //para navegar entre paginas
   const location = useLocation(); 
   const navigate = useNavigate(); 

   //forma de declarar estados
   const [characters, setCharacters] = useState([]); //estado que maneja cada character
   const [access, setAccess] = useState(false); //estado que maneja el acceso del login

   async function login(userData) {

      try {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const {data} = await axios(URL + `?email=${email}&password=${password}`)
            const { access } = data;
            setAccess(data);
            access && navigate('/home');
         
      } catch (error) {
         console.log(error)
      }
      
   }
   

   useEffect(() => {
      !access && navigate('/')
   }, [access])

   const onSearch = async (id) => {
      try {
         const {data} = await axios(`https://rickandmortyapi.com/api/character/${id}`)
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      } catch (error) {
         console.log(error);
      }
      
   }

   const onClose = (id) =>{
      const charactersFiltered = characters.filter(character => character.id !== Number(id))
      setCharacters(charactersFiltered)
   }

   return (
      <div className='App'>

         {
            location.pathname !== "/" && <Nav onSearch={onSearch}/> 
         }

            <Routes>
               <Route path={"/"} element={<Form login={login}/>}/>
               <Route path="/home" element={<Cards characters={characters} onClose={onClose}/>}/>
               <Route path="/about" element={<About/>}/>
               <Route path={"/Detail/:id"} element={<Detail/>}/>
               <Route path="/favorites" element={<Favorites/>}/>
               
            </Routes>
      </div>
   );
}

export default App;
