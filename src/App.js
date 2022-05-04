import './App.css';
import { Routes, Route } from "react-router-dom"
import NavigationBar from './components/NavigationBar/NavigationBar'

import Error from './pages/Error/Error';
import Home from './pages/Home/Home'
import Project from './pages/Project/Project'
import ProjectView from './pages/ProjectView/ProjectView';
import CV from './pages/CV/CV';

function App() {
return (
  
  <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/CV" element={ <CV/> } />
        <Route path="/project" element={ <Project/> } />
        <Route path="/project/:id" element={ <ProjectView/> } />

        <Route path='*' element={ <Error/> } />
      </Routes>
      <NavigationBar/>
    </div>

    );

  }

export default App;
