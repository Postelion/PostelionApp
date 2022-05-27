import {ApiComponent} from '../../../lib/Classes';
import LibraryApi from '../../../lib/Api';

class AdminPanel extends  ApiComponent
{
    Start()
    {
        this.AddRequest(LibraryApi.AddRequest);
    }

}

export default AdminPanel;