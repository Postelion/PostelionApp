import axios from 'axios';
import config from '../config/config';
import Cookies from 'js-cookie';

export default
{
  ApiRequest:{
    GetProjects(callback)
    {
        var options = config.projects.connection_option;
        options.url = config.projects.link_repos;
        axios.request(options);
        axios.request(options).then(function (response) {
            callback(response.data);
          }).catch(function (error) {
            callback(error);
          });
    },
    GetProjectDescription(full_name,callback)
    {
        var options= new Object();
        options.url = 'https://raw.githubusercontent.com/'+full_name+'/main/description.md';
        axios.request(options);
        axios.request(options).then(function (response) {
            callback(response.data);
          }).catch(function (error) {
            callback(error);
          });
    },
    GetProjectVersion(full_name,callback)
    {
        var options = config.projects.connection_option;
        options.url = 'https://api.github.com/repos/'+full_name+'/releases/latest';
        axios.request(options);
        axios.request(options).then(function (response) {
            callback(response.data.name);
          }).catch(function (error) {
            callback(error);
          });
    },
    GetProject(id,callback)
    {
        var options = config.projects.connection_option;
        options.url = config.projects.link_repos;
        axios.request(options);
        axios.request(options).then(function (response) {
            callback(response.data[id]);
          }).catch(function (error) {
            callback(error);
          });
    },
    GetReleases(full_name,callback)
    {
        var options = config.projects.connection_option;
        options.url = 'https://api.github.com/repos/'+full_name+'/releases';
        axios.request(options);
        axios.request(options).then(function (response) {
            callback(response.data);
          }).catch(function (error) {
            callback(error);
          });
    },
    GetCommits(full_name,callback)
    {
        var options = config.projects.connection_option;
        options.url = 'https://api.github.com/repos/'+full_name+'/commits';
        axios.request(options);
        axios.request(options).then(function (response) {
            callback(response.data);
          }).catch(function (error) {
            callback(error);
          });
    },
    GetDefaultCV(callback)
    {
      axios.get(config.ConfigApi+"cv/default",{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    },
    GetUserGet(callback)
    {
      axios.get(config.ConfigApi+"user/get",{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    },
    GetServices(callback)
    {
      axios.get(config.ConfigApi+"services/get",{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    },
    CheckService(link,callback)
    {
      axios.get(config.ConfigApi+link,{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    },
    GetModules(callback)
    {
      axios.get(config.ConfigApi+'modules/get',{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    },
    GetAdminSecurity(callback,password)
    {
      axios.get(config.ConfigApi+'user/admin',{ params:{token:Cookies.get('token'),password:password}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    },
    CheckToken()
    {
      return Cookies.get('token').length >0;
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