import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Login (props)
{

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
      });
        return(<div></div>);

}

export default Login;