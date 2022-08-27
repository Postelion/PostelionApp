import axios from 'axios';
import configApi from '../config/config';
import cookies from 'js-cookie';
import qs from 'qs';

const ApiIP = 'http://localhost:3001'

export default
{
  ApiRequest:{
    getCurrentModules(callback)
    {
      var config = {
        method: 'get',
        url: ApiIP+'/modules/current',
        headers: { 
          'Authorization': 'Bearer '+ cookies.get('token')
        }
      };
      
      axios(config)
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        callback(error);
      });
      
    },
    getCurrentUser(callback)
    {
      var config = {
        method: 'get',
        url: ApiIP+'/user/current',
        headers: { 
          'Authorization': 'Bearer '+ cookies.get('token')
        }
      };
      
      axios(config)
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        callback(error);
      });
    },
    setCurrentUser(callback,name)
    {
      var data = qs.stringify({
        'name': name
      });
      var config = {
        method: 'post',
        url: ApiIP+'/user/current',
        headers: { 
          'Authorization': 'Bearer '+ cookies.get('token'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        if(callback!=null)callback(response);
      })
      .catch(function (error) {
        if(callback!=null)callback(error);
      });
      
    },
    getDefaultCv(callback)
    {
      var config = {
        method: 'get',
        url: ApiIP+'/cv/default',
        headers: { 
          'Authorization': 'Bearer '+ cookies.get('token')
        }
      };
      
      axios(config)
      .then(function (response) {
        if(callback!=null)callback(response);
      })
      .catch(function (error) {
        if(callback!=null)callback(error);
      });
    },
    getProjects(callback)
    {
      var config = {
        method: 'get',
        url: ApiIP+'/projects',
        headers: { 
          'Authorization': 'Bearer '+ cookies.get('token')
        }
      };
      
      axios(config)
      .then(function (response) {
        if(callback!=null)callback(response);
      })
      .catch(function (error) {
        if(callback!=null)callback(error);
      });
    },
    getMessages(callback)
    {
      var config = {
        method: 'get',
        url: ApiIP+'/messages',
        headers: { 
          'Authorization': 'Bearer '+ cookies.get('token')
        }
      };
      
      axios(config)
      .then(function (response) {
        if(callback!=null)callback(response);
      })
      .catch(function (error) {
        if(callback!=null)callback(error);
      });
    },
    setSendMessages(callback,value)
    {
      var data = qs.stringify({
        'value': value
      });
      var config = {
        method: 'post',
        url: ApiIP+'/messages/send',
        headers: { 
          'Authorization': 'Bearer '+ cookies.get('token'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        if(callback!=null)callback(response);
      })
      .catch(function (error) {
        if(callback!=null)callback(error);
      });
    }    
  },
  ApiResponse:
  {
    GetResponse(data,success,loading,noAuth,error)
    {
      if(data!=null)
      {
        if(data.status==200)
        {
          success();
        }
        else if (data.status==403)
        {
          noAuth();
        }
        else {
          error();
        }
      }
      else 
      {
        loading();
      }
    }

  }

}