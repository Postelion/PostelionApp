import React, { useState} from 'react';
import "./ProjectView.css";
import { useParams } from 'react-router';
import ApiRequest from '../../lib/ApiRequest';
import ProjectReleaseView from '../../components/ProjectReleaseView/ProjectReleaseView';
import Loading from '../../components/Loading/Loading';

function ProjectView()
{
    function formatDate  (date)  {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString().padStart(2, '0');
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        let hours = d.getHours();
        hours =("0" + hours).slice(-2);
        let minutes = d.getMinutes();
        minutes =("0" + minutes).slice(-2);
        return [year, month, day].join('-') +" " + [hours,minutes].join(':');
    }
    function formatSize(size){
        if(size>1000)
        {
            size = size /1000;
            if(size>1000)
            {
                size = size /1000;
                return size + "GB";
            }
            return size + "MB";
        }
        return size + "KB";

    }
    const { id } = useParams();
    const [Data, setData] = useState(null);
    const [Version, setVersion] = useState(null);
    const [Description, setDescription] = useState(null);
    const [Releases, setReleases] = useState(null);
    const [Commits, setCommits] = useState(null);
    if(Data == null)
    {
        ApiRequest.GetProject(id,function(data){
            ApiRequest.GetProjectVersion(data.full_name,function(ver){
                ApiRequest.GetProjectDescription(data.full_name,function(des){
                    ApiRequest.GetReleases(data.full_name,function(res){
                        ApiRequest.GetCommits(data.full_name,function(com){
                            setData(data);
                            setCommits(com);
                            setDescription(des);
                            setVersion(ver);
                            setReleases(res);
                        });
                    });
                });
            });
            
        });
    }

    
            

    if(Data !=null && Releases!= null)
    {
       return(
           <div id='ProjectView'>
               <div className='info_1'>
                    <div className='info'>
                        <div className='title'>{Data.name}</div>
                        <div className='author'>{Data.owner.login}</div>
                        <br/>
                        <div className='created'>Utworzono: {formatDate(Data.created_at)}</div>
                        <div className='modified'>Zaktualizowano: {formatDate(Data.pushed_at)}</div>
                        <br/>
                        <div className='modified'>Wersja: {Version}</div>
                        <br/>
                        <div className='modified'>Rozmiar: {formatSize(Data.size)}</div>
                        <br/>
                        <div className='modified'>Opis: {Description}</div>
                    </div>
                    <div>
                        {
                            Releases.map((data,key) =>(
                                <ProjectReleaseView key={key} data={data} latest={data.name==Version? true:false}/>
                            ))
                        }
                    </div>
                    <div className='avatar'><img title={Data.owner.login} src={Data.owner.avatar_url}/></div>
               </div>
               <div className='history'>
               {
                    Commits.map((data,key) =>(
                        <HistoryCommit key={key} data={data}/>
                    ))
                }
               </div>
           </div>
       )

    
    }
    else 
    {
        return(
            <div id='ProjectView'>
                <Loading/>
            </div>
        )
    }

}

function HistoryCommit(props)
{
    function formatDate (date)  {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString().padStart(2, '0');
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        let hours = d.getHours();
        hours =("0" + hours).slice(-2);
        let minutes = d.getMinutes();
        minutes =("0" + minutes).slice(-2);
        return [year, month, day].join('-') +" " + [hours,minutes].join(':');
    }
    return(
        <div className='history_position'>
            <div>
            
                <strong>{props.data.sha}</strong>
            
            </div>
            <div>
            {
                props.data.commit.message
            }
            </div>
            <div>
            {
                formatDate(props.data.commit.author.date)
            }
            </div>
        </div>
    )
}

export default ProjectView;