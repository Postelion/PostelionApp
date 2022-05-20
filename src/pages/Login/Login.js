import Cookies from 'js-cookie';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Login (props)
{

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
      });
    const [ready, setReady] = useState(false);
    const { token } = useParams();
    Cookies.set('token',token);
    
        return(<div></div>);

}

export default Login;