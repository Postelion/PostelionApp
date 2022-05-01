import './App.css';
import Home from './pages/Home'
import Project from './pages/Project'
import { Routes, Route } from "react-router-dom"
import NavigationBar from './components/NavigationBar'

function App() {
return (
  
  <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/project" element={ <Project/> } />
      </Routes>
      <NavigationBar/>
    </div>

    );

  }

export default App;
