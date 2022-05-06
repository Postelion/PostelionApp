import React from 'react'
import './CV.css'
import pdf from '../../components/PDFCreator/PDFCreator';
import CVconfig from '../../config/cv';
import MaterialIcon from 'material-icons-react';
import avatar from './avatar.jpg';
import CircularProgress from '@mui/material/CircularProgress';

class CV extends React.Component
{
    changecompany()
    {
       this.setState({company:this.company.current.value});
    }

    constructor(props)
    {
        super(props);
        this.company = React.createRef();
        this.state = {company:''};
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
                        <div style={{textAlign:'left',marginLeft:'25px',marginTop:'100px'}}>
                        Wyrazam zgode na przetwarzanie moich danych osobowych przez {this.state.company} w celu
                        prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.
                        </div>
                    </div>
                    <div className='right'>
                        <img src={avatar}/>
                        <div style={{height:'1000px',width:'500px',alignSelf:'flex-end',backgroundImage:'url(./static/side.png)',backgroundRepeat:'no-repeat'}}>
                            <div className='section' >
                               <div className='title'><span>UMIEJĘTNOŚCI</span></div> 
                               <Skill value={25} name="C#"/>
                            </div>  
                        </div>
                    </div>
                </div>
                <input style={{margin:'5px'}} onChange={()=>{this.changecompany();}} ref={this.company} type="text" placeholder='NAZWA FIRMY'/>
               <div style={{marginBottom:'25px'}} className='download' onClick={()=>{pdf.Generate(this.company.current.value);}}>POBIERZ JAKO PDF</div>

            </div>
        )
    }

}

function Skill(props)
{
    return(
        <div style={{backgroundColor:'red',width:'100px',height:'100px'}}>
            <CircularProgress variant="determinate" value={props.value} size={100} thickness={7}></CircularProgress>
            <CircularProgress variant="determinate" value={100} size={100} thickness={7}></CircularProgress>
        </div>
    )
}

export default CV;