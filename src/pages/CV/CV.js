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
                        <div className='section'>
                            <div className='title'>
                                <span>WYKSZTAŁCENIE</span>
                            </div>
                            <div className='content'>
                                {
                                    CVconfig.school.map((data,index) =>
                                    <div key={index} style={{marginLeft:'20px'}}>
                                    <strong style={{fontSize:'20px',padding:'5px'}}>{data.name}</strong>
                                    <div style={{padding:'5px'}}>{data.as}</div>
                                    <div  style={{paddingLeft:'5px'}}>{data.date}</div>
                                    </div>
                                  )
                                }
                            </div>
                        </div>

                        <div className='section'>
                            <div className='title'>
                                <span>DOŚWIADCZENIE</span>
                            </div>
                            <div className='content'>
                                {
                                    CVconfig.experience.map((data,index) =>
                                    <div key={index} style={{marginLeft:'20px'}}>
                                    <strong style={{fontSize:'20px',padding:'5px'}}>{data.name}</strong>
                                    <div style={{padding:'5px'}}>{data.date}</div>
                                    <div style={{fontFamily:'Montserrat-light',padding:'5px'}}>{data.description}</div>
                                    </div>
                                  )
                                }
                            </div>
                        </div>

                        <div className='section'>
                            <div className='title'>
                                <span>O Sobie</span>
                            </div>
                            <div className='content'>
                                <div style={{marginLeft:'25px',paddingBottom:'50px'}}>
                                {
                                   CVconfig.about
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <img src={avatar}/>
                        <div className='infos'>

                        </div>
                    </div>
                </div>
                <input style={{margin:'5px'}} ref={this.company} type="text" placeholder='NAZWA FIRMY'/>
               <div style={{marginBottom:'25px'}} className='download' onClick={()=>{pdf.Generate(this.company.current.value);}}>POBIERZ JAKO PDF</div>

            </div>
        )
    }

}

export default CV;