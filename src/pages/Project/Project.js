import React,{useEffect}from 'react'; //React
import './Project.css'; //CSS
import ProjectModule from '../../components/ProjectModule/ProjectModule'; //Component
import ApiRequest from '../../lib/ApiRequest';
import Loading from '../../components/Loading/Loading';

class Project extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state= {projects:null};
        const main = this;
        ApiRequest.GetProjects(function(data){main.setState({projects:data})});
    }

    render()
    {
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