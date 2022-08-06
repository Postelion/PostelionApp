import React,{useEffect,useRef}from 'react'; //React
import './Project.css'; //CSS
import libraryApi from '../../lib/Api';
import Loading from '../../components/Loading/Loading';
import {ApiComponent} from '../../lib/Classes';

class Project extends ApiComponent
{

    Start()
    {
        this.AddRequest(libraryApi.ApiRequest.getProjects);
        this.StartRequest();
    }

    Success(data)
    {
        if(data[0].response!=null)
        {
            return (
                <div id="Project">
                    {
                        data[0].response.map((data,key) =>(
                          <ProjectView props={data} key={key}/>  
                        ))
                    } 
                </div>
            )
        }
        else 
        {
            return (
                <div id="Project">
                   <Loading/>
                </div>
            ) 
        }

    }
}

function ProjectView(props)
{
    console.log(props.props.additionalData)
    let main_picture;
    let width='250px';
    let height='250px';
    let description = '';

    for(let i=0;i<props.props.additionalData.length;i++)
    {
        switch(props.props.additionalData[i].name)
        {
            case "main_picture":
                main_picture =props.props.additionalData[i].value;
            break;
            case "width":
                width =props.props.additionalData[i].value;
            break;
            case "height":
                height =props.props.additionalData[i].value;
            break;
            case "description":
                description =props.props.additionalData[i].value;
            break;
        }
    }

    return (
        <div className='ProjectView' style={{width:width,height:height}}>
            <div className='picture' style={{backgroundImage:'url("'+main_picture+'")'}}>
            </div>
            <span className='title'>{props.props.name}</span>
            <div className='description'  dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
    )
}

export default Project;