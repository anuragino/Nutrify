import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// import compontents
import Register from './component/register'
import Login from './component/login'
import NotFound from './component/notFound'
import { Track } from './component/track'
import { authContext } from './contexts/authContext'
import Private from './component/Private'



function App() {

  const [loggedUser,setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrify-user")));


  return (
    <>
      <authContext.Provider  value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/track' element={<Private Compontent={Track}/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
      
    </>
  )
}

export default App
