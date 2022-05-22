import React,{useState} from "react";

export const ApiComponent = class ApiComponentClass extends React.Component
{
    requests = [];

    componentDidMount()
    {
        this.state = {status:'load'};
        this.Start();
    }

    AddRequest(request,...args){
        this.requests.push({req:request,args:args});
    }
    StartRequest()
    {
        for (let index = 0; index < this.requests.length; index++) {
            this.requests[index].req((data)=>{

                console.log(data);
            },this.requests[index].args);
        }
    }
    Start(){}
    Success(data){}
    Error(){}
    NoAuth(){}
    Loading(){}

    render()
    {
        if(this.state.status!=null)
        {
            if(this.state.status=='load')
            {
                return (this.Loading());
            }
            else
            {
                return (this.Success()) 
            }
        }
    }
}