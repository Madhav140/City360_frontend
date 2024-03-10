import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Register from './Components/Register';
import WorkRegister from './Components/WorkRegister';
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import Userpage from './Components/Userpage';
import Workerpage from './Components/Workerpage';
import Adminpage from './Components/Adminpage';
import { isAuthToken } from './Context/ContextShare';




function App() {
 
  const {isloggedOut,SetisloggedOut} = useContext(isAuthToken)
  const location = useLocation()
  const [render,setrender] = useState(false)

  
   useEffect(()=>{
    if(location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/workerLogin' || location.pathname === '/worker/register' || location.pathname === '/adminLogin'){
      setrender(true)
  }
   },) 
  return (
   <>
   {!render &&
   <Header/>}

   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/login' element={<Register/>}/>
   <Route path='/register' element={<Register register />}/>
   <Route path='/workerLogin' element={<WorkRegister workerLogin/>}/>
   <Route path='/worker/register' element={<WorkRegister/>}/>
   <Route path='/userpage' element={isloggedOut?<Userpage/>:<Home/>}/>
   <Route path='/workerpage' element={isloggedOut?<Workerpage/>:<Home/>}/>
   <Route path='/worker/register' element={<WorkRegister/>}/>
   <Route path='/adminpage' element={isloggedOut?<Adminpage/>:<Home/>}/>
   <Route path='/adminLogin' element={<Adminpage adminLogin/>}/>


   </Routes>
   
   {!render &&
    <Footer/>}
   </>
  );
}

export default App;
