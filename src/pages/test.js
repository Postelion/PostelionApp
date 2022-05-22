import {ApiComponent} from "../lib/Classes";
import LibraryApi from '../lib/Api';

class Test extends ApiComponent
{

    Start()
    {
        this.AddRequest(LibraryApi.ApiRequest.GetServices,'asd',1);
        this.StartRequest();
    }

    Success(data)
    {
        return (
            <div></div>
        )
    }
}

export default Test;