import Navbar from './components/root/navbar/Navbar';
import './App.css';
import './style.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/root/home/Home';
import FreeEvents from './components/events/free-events/FreeEvents';
import ProEvents from './components/events/pro-events/ProEvents';
import UploadEvents from './components/events/upload/UploadEvents';
import Login from './components/users/login/Login';
import Register from './components/users/register/Register';
import {store} from './redux/store';
import React, { useEffect } from 'react';
import { getUserInfo } from './redux/users/users.actions';
import { USERS_FEATURE_KEY } from './redux/users/users.reducer';
import Alert from './components/root/alert/Alert';

let App = () => {
  let {isAuthenticated} = useSelector((state)=>{
    return state[USERS_FEATURE_KEY];
  })

  useEffect(()=>{
    if(isAuthenticated){
      store.dispatch(getUserInfo());
    }
  },[isAuthenticated]);

  return (
    <React.Fragment>
        <Router>
          <Navbar/>
          <div>
            <Alert/>
          </div>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/events/free' element={<FreeEvents/>}/>
            <Route exact path='/events/pro' element={<ProEvents/>}/>
            <Route exact path='/events/upload' element={<UploadEvents/>}/>
            <Route exact path='/users/login' element={<Login/>}/>
            <Route exact path='/users/register' element={<Register/>}/>
          </Routes>
        </Router>
    </React.Fragment>
  );
}

export default App;
