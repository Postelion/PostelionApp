import './App.css';
import { Routes, Route } from "react-router-dom"
import NavigationBar from './components/NavigationBar/NavigationBar'
import React,{useState} from 'react';

import Error from './pages/Error/Error';
import Home from './pages/Home/Home'
import Project from './pages/Project/Project'
import ProjectView from './pages/ProjectView/ProjectView';
import Panel from './pages/Panel/Panel';
import CV from './pages/CV/CV';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import config from "./config/config";
import Test from './pages/test';

function App() {
  document.documentElement.style.setProperty('--background',config.GetTheme().Background);
return (
  
  <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/CV" element={ <CV/> } />
        <Route path="/project" element={ <Project/> } />
        <Route path="/project/:id" element={ <ProjectView/> } />
        <Route path="/panel" element={ <Panel/> }/>
        <Route path="/login/:token" element={ <Login/> }/>
        <Route path="/admin" element={ <Admin/> }/>
        <Route path="/test" element={ <Test/> }/>
        <Route path='*' element={ <Error/> } />
      </Routes>
      <NavigationBar/>
    </div>

    );

  }


export default App;
