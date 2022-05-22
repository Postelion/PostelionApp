import React,{} from "react";

export const ApiComponent = class ApiComponentClass extends React.Component
{
    requests = [];

    constructor(props)
    {
        super(props);
        this.state = {status:'load'};
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
        let status = 'Success';
        for (let index = 0; index < this.requests.length; index++) {
            try{
                this.requests[index].req((data)=>{
                    
                    //Tworzenie jakies klasy
                    this.requests[index].status = data.status;
                    this.requests[index].response = data.data;
//                    data.status==403?status='NoAuth':(data.status!=200?status='Error':null);

                },this.requests[index].args);
            }
            catch
            {
                this.requests[index].status = 500;
            }
        }
  
        console.log(status);
    }
    Constr(props){};
    Start(){}
    Success(data){}
    Error(){}
    NoAuth(){}
    Loading(){}

    render()
    {
        if(this.state.status!=null)
        {
            if(this.state.status==='load')
            {
                return (this.Loading());
            }
            else
            {
                return (this.Success(this.returns)) 
            }
        }
    }
}