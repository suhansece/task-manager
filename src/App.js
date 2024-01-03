import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Home from './components/Home';
import Login from './components/login';
import Register from './components/register';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

export const userContext =React.createContext();

function App() {
  
  const [user,setUser]=useState({})
  const[notification,setNotification]=useState('');
  
  return(
    <userContext.Provider value={[user, setUser, notification, setNotification]}>

    <BrowserRouter>
    <Navbar/>
  <div style={{marginLeft:"auto",
           marginRight:"auto"}}>
    <Routes >
      <Route path='/'element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
    
  </div>
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App;
//
