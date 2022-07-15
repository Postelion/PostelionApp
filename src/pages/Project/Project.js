import React,{useEffect}from 'react'; //React
import './Project.css'; //CSS
import ProjectModule from '../../components/ProjectModule/ProjectModule'; //Component
import ApiRequest from '../../lib/Api';
import Loading from '../../components/Loading/Loading';
import {ApiComponent} from '../../lib/Classes';

class Project extends ApiComponent
{

    Start()
    {
        this.AddRequest(ApiRequest.GetProjects);
        this.StartRequest();
    }

    Success(data)
    {
        console.log(data);
        if(this.state.projects)
        {
            return (
                <div id="Project">
                    {
                        this.state.projects.map((data,key) =>(
                            <ProjectModule key={key} data={data} index={key}/>
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

export default Project;