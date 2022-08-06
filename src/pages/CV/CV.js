import React, { useEffect } from 'react';
import './CV.css';
import Loading from '../../components/Loading/Loading';
import pdf from '../../components/PDFCreator/PDFCreator';
import MaterialIcon from 'material-icons-react';
import avatar from './avatar.jpg';
import library from '../../lib/Api';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from '@mui/material/styles';
import NoAuth from '../../components/NoAuth/NoAuth';
import {ApiComponent} from '../../lib/Classes';

class CV extends ApiComponent
{

    Constr(props)
    {
        this.CompanyName = '';
        this.CompanyNameInput = React.createRef();
        this.CompanyText = React.createRef();
    }
    Start()
    {
        this.AddRequest(library.ApiRequest.getDefaultCv);
        this.StartRequest();
    }
    NoAuth()
    {
       return(<NoAuth></NoAuth>) 
    }
    Loading()
    {
        return
        (<Loading></Loading>)
    }
    Success(data)
    {
        console.log(data);
        this.CompanyName =data[0].response[6][0].name;

            return (
                <div id="CV">
                    <div className='CV'>
                        <div className='left'>

                            <div className='name'>{data[0].response[0][0].value}<br/>{data[0].response[0][1].value}</div>
                            <div className='contact'>
                                <div>
                                    <MaterialIcon icon="email" color='white' />
                                    <div><a href={"mailto:"+data[0].response[0][4].value}>{data[0].response[0][4].value}</a></div>
                                </div>
                                <div>
                                    <MaterialIcon icon="home" color='white' />
                                    <div><a href="https://goo.gl/maps/r6snRnTD3BFrBFEG8" target="_blank">{data[0].response[0][2].value}</a></div>
                                </div>
                                <div>
                                    <MaterialIcon icon="call" color='white' />
                                    <div><a href={"tel:"+data[0].response[0][3].value}>{data[0].response[0][3].value}</a></div>
                                </div>
                            </div>
                            
                            <div className='section'>
                                <div className='title'>
                                    <span>WYKSZTAŁCENIE</span>
                                </div>
                                <div className='content'>
                                    {
                                        data[0].response[1].map((data,index) =>
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
                                        data[0].response[2].map((data,index) =>
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
                                    data[0].response[0][5].value
                                    }
                                    </div>
                                </div>
                            </div>
                            <div ref={this.CompanyText}  style={{textAlign:'left',marginLeft:'25px',marginTop:'100px',marginBottom:'100px'}}>
                            Wyrazam zgode na przetwarzanie moich danych osobowych przez {this.state.data.CompanyName?this.state.data.CompanyName:this.CompanyName} w celu
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
                                        data[0].response[3].map((data,index)=>
                                        <Skill key={index} value={data.level} name={data.name}/>
                                        )
                                    }
                                    </div> 
                                    <div className='title'><span>JĘZYKI</span></div>
                                    {
                                        data[0].response[4].map((data,index)=>
                                        <SkillLinear key={index} name={data.name} value={data.level}/>
                                        )
                                    }
                                </div>  
                            </div>
                        </div>
                        </div>
                    <input ref={this.CompanyNameInput} className='ClientName' defaultValue={this.CompanyName} type="text" placeholder="NAZWA FIRMY" onChange={()=>{this.UpdateName()}} ></input>
                <div style={{marginBottom:'25px'}} className='download' onClick={()=>{pdf.Generate(this.state.data.CompanyName?this.state.data.CompanyName:this.CompanyName);}}>POBIERZ JAKO PDF</div>

                
            </div>
            )
        
       
    }
    UpdateName()
    {
        this.setStateCustom({'CompanyName':this.CompanyNameInput.current.value});
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