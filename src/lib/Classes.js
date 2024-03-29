import React,{} from "react";

export const ApiComponent = class ApiComponentClass extends React.Component
{
    requests = [];
    constructor(props)
    {
        super(props);
        this.SetStateInit(props.customState);
        this.Constr(props);
    }
    SetStateInit(json)
    {
        this.state = {status:'loading',data:json};
    }
    setStateCustom(json)
    {
        this.setState({data:json});
    }

    componentDidMount()
    {
        this.Start();
        this.DidMount();
    }
    AddRequest(request,...args){
         return (this.requests.push({req:request,args:args,response:null,status:null}))-1;
    }
    async StartRequest()
    {
        this.setState({status:'loading'});
        for (let index = 0; index < this.requests.length; index++) {
            try{
                this.requests[index].req((data)=>{
                    
                    this.requests[index].status = data.status;
                    this.requests[index].response = data.data;
                    if(index===this.requests.length-1)
                    {
                        this.setState({status:'loaded'});
                    }

                },this.requests[index].args);
            }
            catch
            {
                this.requests[index].status = 500;
            }
        }
    }
    ResetRequest()
    {
        this.requests = [];
    }
    DidMount(){};
    Constr(props){};
    Start(){}
    Success(data){}
    Error(error){}
    NoAuth(){}
    Loading(){}
    render()
    {
       if(this.state.status==='loading')
       {
           return (this.Loading());
       }
       else
       {
            
            if(this.requests.some(e => e.status===403))
            {
                return (this.NoAuth());
            }
            else 
            {
                if(this.requests.some(e => e.status>300))
                {
                    return (this.Error(this.requests));
                }
                else {
                    try{return (this.Success(this.requests));}
                    catch {return (this.Error(this.requests));}
                }
            }
        }
    }
}