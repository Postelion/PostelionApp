import {ApiComponent} from "../lib/Classes";
import LibraryApi from '../lib/Api';

class Test extends ApiComponent
{

    Start()
    {
        this.AddRequest(LibraryApi.ApiRequest.GetServices,'asd',1);
        this.StartRequest();
    }

    Loading()
    {
        return(
            <div>Loading</div>
        )
    }
    Error()
    {
        return(
            <div>Error</div>
        )
    }
    NoAuth()
    {
        return(<div>NoAuth</div>)
    }
    Success(data)
    {
        return (
            <div>SUKCES</div>
        )
    }
}

export default Test;