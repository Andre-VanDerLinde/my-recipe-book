import { useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import Recipe from './components/Recipes/Recipe'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { useAuth } from './components/Auth/AuthContext'
import Favorites from './components/Favorites/Favorites'
import RecipeId from './components/Recipes/RecipeId'

function App() {
  const { token } = useAuth()
  return (
    <>
      <div id='nav-bar'>
        <Link to='/'>Home</Link>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
      
      <div id='main'>
        <Routes>
          <Route path='/' element={<Recipe/>}/> //recipe home page 
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route 
            path='/favorites'
            element={token ? <Favorites/> : <Navigate to="/login"/>}  
          />
          <Route path='/recipe/:id' element={<RecipeId/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
