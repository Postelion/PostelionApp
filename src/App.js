import './App.css';
import { Routes, Route } from "react-router-dom"
import NavigationBar from './components/NavigationBar/NavigationBar'

import Error from './pages/Error/Error';
import Home from './pages/Home/Home'
import Project from './pages/Project/Project'
import ProjectView from './pages/ProjectView/ProjectView';
import Panel from './pages/Panel/Panel';
import CV from './pages/CV/CV';

function App() {
return (
  
  <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/CV" element={ <CV/> } />
        <Route path="/project" element={ <Project/> } />
        <Route path="/project/:id" element={ <ProjectView/> } />
        <Route path="/panel" element={ <Panel/> }/>
        <Route path='*' element={ <Error/> } />
      </Routes>
      <NavigationBar/>
    </div>

    );

  }

export default App;
