import React,{useEffect,useRef}from 'react'; //React
import './Project.css'; //CSS
import libraryApi from '../../lib/Api';
import Loading from '../../components/Loading/Loading';
import {ApiComponent} from '../../lib/Classes';
import { Parallax,useParallax } from 'react-scroll-parallax';
import { speed } from 'jquery';

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
                            <Parallax  easing={[0,1.15,1,1.02]} opacity={[-10,2]} key={key}><ProjectView data={data} index={key} /> </Parallax>
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

    if(props.index==0)
    {
        return (
                <div className='ProjectView'>
            
                    <div className='html' style={{top:'0px'}}  dangerouslySetInnerHTML={{ __html: props.data.html }}></div>
                </div>
        )
    }
    else {
        return (

            <div className='ProjectView'>
                <div className='html'  dangerouslySetInnerHTML={{ __html: props.data.html }}></div>
            </div>
            
        )  
    }
}

export default Project;