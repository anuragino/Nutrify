import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'

// import compontents
import Register from './component/register'
import Login from './component/login'
import NotFound from './component/notFound'
import { Track } from './component/track'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/track' element={<Track/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
