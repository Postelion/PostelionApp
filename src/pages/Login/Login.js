import Cookies from 'js-cookie';
import { useParams } from 'react-router';

function Login (props)
{
    const { token } = useParams();
        return(<div>{token}</div>);

}

export default Login;