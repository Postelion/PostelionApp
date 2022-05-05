import React from 'react'
import './CV.css'
import pdf from '../../components/PDFCreator/PDFCreator';
import CVconfig from '../../config/cv';
import MaterialIcon from 'material-icons-react';
import avatar from './avatar.jpg';

class CV extends React.Component
{

    constructor(props)
    {
        super(props);
        this.company = React.createRef();
    }

    render()
    {
        return (
            <div id="CV">
                <div className='CV'>
                    <div className='left'>

                        <div className='name'>{CVconfig.name}<br/>{CVconfig.surname}</div>
                        <div className='contact'>
                            <div>
                                <MaterialIcon icon="email" color='white' />
                                <div><a href={"mailto:"+CVconfig.contact[0]}>{CVconfig.contact[0]}</a></div>
                            </div>
                            <div>
                                <MaterialIcon icon="home" color='white' />
                                <div><a href="https://goo.gl/maps/r6snRnTD3BFrBFEG8" target="_blank">{CVconfig.contact[1]}</a></div>
                            </div>
                            <div>
                                <MaterialIcon icon="call" color='white' />
                                <div><a href={"tel:"+CVconfig.contact[2]}>{CVconfig.contact[2]}</a></div>
                            </div>
                        </div>
                        <div className='school'>
                            <div className='title'>
                                <span>WYKSZTAŁCENIE</span>
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <img src={avatar}/>

                    </div>
                </div>
               <div className='download' onClick={()=>{pdf.Generate(this.company.current.value);}}>POBIERZ JAKO PDF</div>
               <input ref={this.company} type="text" placeholder='NAZWA FIRMY'/>
            </div>
        )
    }

}

export default CV;