import React, {useState} from 'react';
import './Admin.css';

function Admin(props)
{
    const [adminData,setAdminData] = useState(null);
    if(adminData==null)
    {
        return(
            <div id='Admin'>
                WPISZ KOD
                <PasswordInput/>
            </div>
        )
    }
}


function PasswordInput(props)
{
    return(
        <input className='code' placeholder='KOD' type='password'/>
    )
}
export default Admin;