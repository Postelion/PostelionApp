import React,{} from "react";

export const ApiComponent = class ApiComponentClass extends React.Component
{
    requests = [];
    constructor(props)
    {
        super(props);
        this.state = {status:'loading'};
        this.Constr(props);
    }


    componentDidMount()
    {
        this.Start();
    }
    AddRequest(request,...args){
         return (this.requests.push({req:request,args:args,response:null,status:null}))-1;
    }
    StartRequest()
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
    WaitForRequest()
    {
        this.setState({status:'waiting'});
    }
    Waiting(){};
    Constr(props){};
    Start(){}
    Success(data){}
    Error(){}
    NoAuth(){}
    Loading(){}
    render()
    {
       if(this.state.status==='loading')
       {
           return (this.Loading());
       }
       else if (this.state.status==='waiting')
       {
           return(this.Waiting());
       }
       else
       {
            if(this.requests.some(e => e.status===403))
            {
                return (this.NoAuth());
            }
            else 
            {
                if(this.requests.some(e => e.status!==200))
                {
                    return (this.Error());
                }
                else {
                    return (this.Success(this.requests));
                }
            }
        }
    }
}