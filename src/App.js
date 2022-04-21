import './App.css';
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/navbar'
import FirstScreeen from './pages/FirstScreen'

function App() {
return (
  <div className="App">
      <FirstScreeen/>
      <Navbar route='1'/>
      <Routes>
        <Route path="/" element={ <Home/> } />
      </Routes>
    </div>

    );

  }

export default App;
