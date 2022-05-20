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
                    <Services name="API strony" url="url"/>

                </div>
            </div>
        );
    }
}

function Services(props)
{
//asd
    return(
        <div className="option">
            <div>{props.name}</div>
        </div>
    );
}
export default Panel;