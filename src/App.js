import './App.css';
import { Routes, Route } from "react-router-dom";
import NavigationBar from './components/NavigationBar/NavigationBar';
import Dialog,{DialogContext} from './components/Dialog/Dialog';
import Information,{InfoContext} from './components/Information/Information';
import React,{ useState } from 'react';
import libraryTheme from './lib/Theme';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home'
import Project from './pages/Project/Project'
import CV from './pages/CV/CV';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Messages from './pages/Messages/Messages'
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  //Dialog States
  const [dialog_status, setDialog_status] = useState('none');
  const [info_status, setInfo_status] = useState({text:''});

  //Initialize Theme
  libraryTheme.ThemeInit();


  return (
    <DialogContext.Provider value={{dialog:null,dialog_status,setDialog_status}}>
      <InfoContext.Provider value={{info_status,setInfo_status}}>
      <div className="App">
        <ParallaxProvider>
              <Routes>
                <Route path="/login/:token" element={ <Login/> }/>
                <Route path="/" element={ <Home/> } />
                <Route path="/cv" element={ <CV customState="{CompanyName:''}"/> } />
                <Route path="/projects" element={ <Project/> } />
                <Route path="/messages" element={ <Messages/> } />
                <Route path="/admin" element={ <Admin/> }/>
                {/*<Route path="/projects/:id" element={ <ProjectView/> } /> */}
                <Route path='*' element={ <Error/> } />
              </Routes>
        </ParallaxProvider>
        <NavigationBar/>
        <Dialog/>
        <Information/>
      </div>
      </InfoContext.Provider>
    </DialogContext.Provider>
  );
}


export default App;
