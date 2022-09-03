import './App.css';
import { Routes, Route } from "react-router-dom";
import NavigationBar from './components/NavigationBar/NavigationBar';
import Dialog,{DialogContext} from './components/Dialog/Dialog';
import Information,{InfoContext} from './components/Information/Information';
import React,{ useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router';
import libraryTheme from './lib/Theme';
import libraryApi from './lib/Api';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home'
import Project from './pages/Project/Project'
import CV from './pages/CV/CV';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Messages from './pages/Messages/Messages'
import { ParallaxProvider } from 'react-scroll-parallax';
import Loading from './components/Loading/Loading';
import { id } from 'date-fns/locale';
import NoAuth from './components/NoAuth/NoAuth';

function App() {
  //Dialog States
  const [dialog_status, setDialog_status] = useState('none');
  const [info_status, setInfo_status] = useState({text:''});
  const [logged,setLogged] = useState({status:false,no_auth:0});

  //Initialize Theme
  libraryTheme.ThemeInit();
  //Security
  React.useEffect(()=>{
    const dataurl = window.location.pathname.split('/');
    if(dataurl[1]==='login' && logged.no_auth==0)
    {
      Cookies.set('token',dataurl[2]);
      libraryApi.ApiRequest.login((data)=>{
        if(data.status==200) setLogged({status:true});
        else setLogged({status:false,no_auth:1})
      });
    }
    else
    {
      libraryApi.ApiRequest.login((data)=>{
        if(data.status==200) setLogged({status:true});
        else setLogged({status:false,no_auth:1})
      });
    }
  },[]);

  if(logged.status)
  {
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
  else 
  {
    if(logged.no_auth==0) return(<Loading text="LOGOWANIE"/>);
    else return(<NoAuth/>);
  }
}


export default App;
