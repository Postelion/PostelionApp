import {ApiComponent} from '../../../lib/Classes';
import LibraryApi from '../../../lib/Api';
import {useEffect} from 'react';
import Loading from '../../../components/Loading/Loading';
import NoAuth from '../../../components/NoAuth/NoAuth';
import './AdminPanel.css';

class AdminPanel extends  ApiComponent
{
    Start()
    {
        this.AddRequest(LibraryApi.ApiRequest.GetSpecificModules,'admin');
        this.AddRequest(LibraryApi.ApiRequest.GetAdminAlreadyLogged);
        this.StartRequest();
    }
    Success(data)
    {
        return (<div id='AdminPanel'>


        </div>)
    }
    NoAuth()
    {
        return (<div id='AdminPanel'><NoAuth/></div>)
    }
    Loading()
    {
        return (<div id='AdminPanel'><Loading/></div>)
    }

}

export default AdminPanel;