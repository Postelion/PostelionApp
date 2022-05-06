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
                        <div style={{height:'100%',width:'100%',alignSelf:'flex-end'}}>
                            <svg height="1000" width="500" style={{float:'right'}}>
                                <path d="M 500,0 L100,50 Q0,60 5,150 L30,850 Q30,900 60,900 L500,950" fill='white' />
                            </svg>
                            <div style={{backgroundColor:'red',width:'50px',height:'50px',position:'relative',left:'580px'}}>

                            </div>
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