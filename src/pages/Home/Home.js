import React from 'react'
import './Home.css'
import {ApiComponent} from '../../lib/Classes';
import libraryApi from '../../lib/Api';
import Loading from '../../components/Loading/Loading'

class Home extends ApiComponent
{
    Start()
    {
        this.AddRequest(libraryApi.ApiRequest.GetUserGet);
        this.StartRequest();
    }


   Success(data)
   {
    return(<div id='Home'>
        <span className='WelcomeText'>WITAJ
            <span className='NextText'>Aktualnie przypisana nazwa firmy to: {data[0].response[0].name}</span>
            <span className='NextText'></span>
        </span>

    </div>)
   }

}

export default Home;