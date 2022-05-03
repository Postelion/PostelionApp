import './App.css';
import { Routes, Route } from "react-router-dom"
import NavigationBar from './components/NavigationBar/NavigationBar'

import Home from './pages/Home/Home'
import Project from './pages/Project/Project'
import ProjectView from './pages/ProjectView/ProjectView';

function App() {
return (
  
  <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/project" element={ <Project/> } />
        <Route path="/project/:id" element={ <ProjectView/> } />
      </Routes>
      <NavigationBar/>
    </div>

    );

  }

export default App;
