import React, { useState } from "react";
import './Panel.css';
import library from "../../lib/Api";
import Cookies from 'js-cookie';
import Loading from '../../components/Loading/Loading';

class Panel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {loaded:false};
        library.GetServices(Cookies.get('token'),(data)=>{
            this.Services = data.data;
            this.setState({loaded:true});
        });
    }

    render()
    {
        if(this.state.loaded)
        {
            return(
                <div id="Panel">
                    <div className="services">
                        Usługi
                        {
                            this.Services.map((data,index)=>
                                <Services key={index} name={data.name} url={data.check_link}/>
                            )
                        }

                    </div>
                </div>
            );
         }
         else {
            return(
                <div id="Panel">
                    <Loading/>
                </div>
            );
         }
    }
}

function Services(props)
{
    const [check, setcheck] = useState(null);
    if(check==null)
    {
        library.CheckService(Cookies.get('token'),props.url,(data)=>{
            if(data.status==200) setcheck(true);
            else setcheck(false);
        });
    }
    if(check==null)
    {
        return(
            <div className="check">
                <div>{props.name}</div>
                <div>Sprawdzanie</div>
            </div>
        );
    }
    else if (check==true)
    {
        return(
            <div className="checked">
                <div>{props.name}</div>
                <div>Działa</div>
            </div>
        );
    }
    else {

        return(
            <div className="broken">
                <div>{props.name}</div>
                <div>Nie działa</div>
            </div>
        );
    }
}
export default Panel;