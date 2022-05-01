import React from "react";
import "./ProjectModule.css"
import anime from 'animejs';
import $ from "jquery";

class ProjectModule extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.ref = React.createRef();
        this.state= {content:"",version:""};
        fetch('https://raw.githubusercontent.com/'+props.data.full_name+'/main/description.md')
            .then((r) => r.text())
            .then(text => this.setState({ content: text }));
        fetch('https://api.github.com/repos/'+props.data.full_name+'/releases/latest')
            .then(response => response.json())
            .then(data => this.setState({ version: data.name }));
            
    }
    formatDate = (date) => {
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
    Hover()
    {

        anime(
            {
                targets: this.ref.current,
                duration: 500,
                scale: 1.01
            }
        )
        
    }
    UnHover()
    {
        anime(
            {
                targets: this.ref.current,
                duration: 500,
                scale: 1
            }
        )
    }


    render(){
        return(

            <div ref={this.ref} className="project-module" onMouseEnter={()=>{this.Hover()}} onMouseLeave={()=>{this.UnHover()}} onClick={this.props.click}>
                <div className="title">
                    <span>{this.props.data.name}</span>
                     <img title={this.props.data.owner.login} src={this.props.data.owner.avatar_url}/>
                </div>
                <div className="content">
                    {this.state.content}
                    <br/>
                    <br/>
                    Zaktualizowano: {this.formatDate(this.props.data.pushed_at)}
                    <br/>
                    Utworzono: {this.formatDate(this.props.data.created_at)}
                </div>
                <div className="version">
                    <span title="Aktualna wersja projektu">{this.state.version}</span>
                </div>
            </div>
        )
    }
}

export default ProjectModule;