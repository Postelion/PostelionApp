import './App.css';
import { Routes, Route } from "react-router-dom"
import NavigationBar from './components/NavigationBar/NavigationBar'
import React from 'react';
import libraryTheme from './lib/Theme';

import Error from './pages/Error/Error';
import Home from './pages/Home/Home'
import Project from './pages/Project/Project'
import ProjectView from './pages/ProjectView/ProjectView';
import Panel from './pages/Panel/Panel';
import CV from './pages/CV/CV';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Test from './pages/test';
import Kalkulator from './pages/Mini kalkulator/kalkulator';
import AdminPanel from './pages/Admin/AdminPanel/AdminPanel';

function App() {
  libraryTheme.ThemeInit();
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
        <Route path="/admin/panel" element={ <AdminPanel/> }/>
        <Route path="/test" element={ <Test/> }/>
        <Route path='/kalkulator' element={<Kalkulator/>}/>
        <Route path='*' element={ <Error/> } />
      </Routes>
      <NavigationBar/>
    </div>);

  }


export default App;
