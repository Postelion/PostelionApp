import React from "react";
import './Panel.css';

class Panel extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div id="Panel">
                <div className="services">
                    Usługi
                    <Services name="Usługa" url="url"/>

                </div>
            </div>
        );
    }
}

function Services(props)
{

    return(
        <div className="option">
            <div>{props.name}</div>
            <div>AKTYWNA</div>
        </div>
    );
}
export default Panel;