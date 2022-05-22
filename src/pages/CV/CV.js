import React from 'react';
import './CV.css';
import Loading from '../../components/Loading/Loading';
import pdf from '../../components/PDFCreator/PDFCreator';
import MaterialIcon from 'material-icons-react';
import avatar from './avatar.jpg';
import library from '../../lib/Api';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from '@mui/material/styles';
import NoAuth from '../../components/NoAuth/NoAuth';
import Cookies from 'js-cookie';

class CV extends React.Component
{
      


    constructor(props)
    {
        
        super(props);
        this.company = React.createRef();
        this.state = {company:'',loaded:false,security:false,not_found:false};
    }

    componentDidMount()
    {
        library.GetDefaultCV(Cookies.get('token'),(data)=>{
            if(data.status==200){
                library.GetUserGet(Cookies.get('token'),(user)=>{
                    this.userName = user.data.name;
                    this.setState({loaded:true});
                });
                this.CVconfig = data.data;
                this.setState({loaded:true});
            }
            else if (data.status==403)
            {
                this.setState({security:true});
            }
        });
        
    }

    render()
    {

        if(this.state.loaded)
        {
        return (
            <div id="CV">
                <div className='CV'>
                    <div className='left'>

                        <div className='name'>{this.CVconfig.data.name}<br/>{this.CVconfig.data.surname}</div>
                        <div className='contact'>
                            <div>
                                <MaterialIcon icon="email" color='white' />
                                <div><a href={"mailto:"+this.CVconfig.data.email}>{this.CVconfig.data.email}</a></div>
                            </div>
                            <div>
                                <MaterialIcon icon="home" color='white' />
                                <div><a href="https://goo.gl/maps/r6snRnTD3BFrBFEG8" target="_blank">{this.CVconfig.data.adress}</a></div>
                            </div>
                            <div>
                                <MaterialIcon icon="call" color='white' />
                                <div><a href={"tel:"+this.CVconfig.data.phone}>{this.CVconfig.data.phone}</a></div>
                            </div>
                        </div>
                        <div className='section'>
                            <div className='title'>
                                <span>WYKSZTAŁCENIE</span>
                            </div>
                            <div className='content'>
                                {
                                    this.CVconfig.data.schools.map((data,index) =>
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
                                    this.CVconfig.data.experience.map((data,index) =>
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
                                   this.CVconfig.data.about
                                }
                                </div>
                            </div>
                        </div>
                        <div style={{textAlign:'left',marginLeft:'25px',marginTop:'100px',marginBottom:'100px'}}>
                        Wyrazam zgode na przetwarzanie moich danych osobowych przez {this.userName} w celu
                        prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.
                        </div>
                    </div>
                    <div className='right'>
                        <img src={avatar}/>
                        <div style={{height:'1000px',width:'500px',alignSelf:'flex-end',backgroundImage:'url(./static/side.png)',backgroundRepeat:'no-repeat'}}>
                            <div className='section' >
                               <div className='title'><span>UMIEJĘTNOŚCI</span></div>
                               <div style={{display:'grid',gridTemplateColumns: 'auto auto auto',gap:'25px'}}>
                                
                                {
                                    this.CVconfig.data.skills.map((data,index)=>
                                    <Skill key={index} value={data.level} name={data.name}/>
                                    )
                                }
                                </div> 
                                <div className='title'><span>JĘZYKI</span></div>
                                {
                                    this.CVconfig.data.languages.map((data,index)=>
                                    <SkillLinear key={index} name={data.name} value={data.level}/>
                                    )
                                }
                            </div>  
                        </div>
                    </div>
                </div>
               <div style={{marginBottom:'25px'}} className='download' onClick={()=>{pdf.Generate(this.userName);}}>POBIERZ JAKO PDF</div>

            </div>
        )
       }
       else {
           if(this.state.security)
           {
            return (<div id="CV"><NoAuth/></div>)
           }
           else{
            return (<div id="CV"><Loading/></div>)
           }
        }
    }

}

function Skill(props)
{
    const theme = createTheme({
        palette:{
            primary:{
                    main: '#20364c'
            }
        }
    })
    return(
        <div style={{width:'100px',height:'100px',display:'grid'}}>
            <CircularProgress theme={theme} variant="determinate" color='primary' value={props.value*10} size={100} thickness={7}></CircularProgress>
            <div style={{color:'#20364c',
            fontFamily:'Montserrat-ExtraBold',
            position:'absolute',
            display:'grid',
            width:'100px',
            height:'100px',
            }}><span style={{textAlign:'center',alignSelf:'center',fontSize:props.FontSize}}>{props.name}</span></div>
        </div>
    )
}

function SkillLinear(props)
{
    var widthValue = 350 / 100 * (props.value*10);
    return(
        
        <div style={{color:'black',display:'flex',flexDirection:'column',position:'relative'}}>
            <div style={{textAlign:'left',marginBottom:'15px',position:'relative',left:'50px'}}>{props.name}</div>
            <div style={{width:'350px',height:'5px',backgroundColor:'#8796a1',position:'relative',left:'50px'}}>
                <div style={{backgroundColor:'#20364c',width:widthValue+'px',height:'5px'}}>

                </div>
            </div>
        </div>
    )
    
}

export default CV;