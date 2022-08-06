import axios from 'axios';
import configApi from '../config/config';
import cookies from 'js-cookie';
import qs from 'qs';

const ApiIP = 'http://192.168.1.12:3001'

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
    }

    // SetCompanyName(callback,value)
    // {
    //   axios.post(config.ConfigApi+"user.php?action=set_name&value="+value,{ body:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetCompanyName(callback)
    // {
    //   axios.post(config.ConfigApi+"user.php?action=get_specific",{ body:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetProjects(callback)
    // {
    //     var options = config.projects.connection_option;
    //     options.url = config.projects.link_repos;
    //     axios.request(options);
    //     axios.request(options).then(function (response) {
    //         callback(response.data);
    //       }).catch(function (error) {
    //         callback(error);
    //       });
    // },
    // GetProjectDescription(full_name,callback)
    // {
    //     var options= new Object();
    //     options.url = 'https://raw.githubusercontent.com/'+full_name+'/main/description.md';
    //     axios.request(options);
    //     axios.request(options).then(function (response) {
    //         callback(response.data);
    //       }).catch(function (error) {
    //         callback(error);
    //       });
    // },
    // GetProjectVersion(full_name,callback)
    // {
    //     var options = config.projects.connection_option;
    //     options.url = 'https://api.github.com/repos/'+full_name+'/releases/latest';
    //     axios.request(options);
    //     axios.request(options).then(function (response) {
    //         callback(response.data.name);
    //       }).catch(function (error) {
    //         callback(error);
    //       });
    // },
    // GetProject(id,callback)
    // {
    //     var options = config.projects.connection_option;
    //     options.url = config.projects.link_repos;
    //     axios.request(options);
    //     axios.request(options).then(function (response) {
    //         callback(response.data[id]);
    //       }).catch(function (error) {
    //         callback(error);
    //       });
    // },
    // GetReleases(full_name,callback)
    // {
    //     var options = config.projects.connection_option;
    //     options.url = 'https://api.github.com/repos/'+full_name+'/releases';
    //     axios.request(options);
    //     axios.request(options).then(function (response) {
    //         callback(response.data);
    //       }).catch(function (error) {
    //         callback(error);
    //       });
    // },
    // GetCommits(full_name,callback)
    // {
    //     var options = config.projects.connection_option;
    //     options.url = 'https://api.github.com/repos/'+full_name+'/commits';
    //     axios.request(options);
    //     axios.request(options).then(function (response) {
    //         callback(response.data);
    //       }).catch(function (error) {
    //         callback(error);
    //       });
    // },
    // GetDefaultCV(callback)
    // {

    //   axios.post(config.ConfigApi+"cv.php?action=get_default",{ body:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetUserGet(callback)
    // {
    //   axios.post(config.ConfigApi+"user.php?action=get_specific",{ body:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetServices(callback)
    // {
    //   axios.get(config.ConfigApi+"services/get",{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // CheckService(link,callback)
    // {
    //   axios.get(config.ConfigApi+link,{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetModules(callback)
    // {
    //   axios.post(config.ConfigApi+'modules.php?action=get',{ body:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetAdminSecurity(callback,password)
    // {
    //   axios({
    //     method: 'post',
    //     url: config.ConfigApi+'user/admin',
    //     data: qs.stringify({
    //       token: Cookies.get('token'),
    //       password: password[0]
    //     }),
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" }
    //   }).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});;
    //   // axios.post(config.ConfigApi+'user/admin',{token:Cookies.get('token'),password:password}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetSpecificModules(callback,modules)
    // {
    //   axios.get(config.ConfigApi+'modules/'+modules,{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetAdminAlreadyLogged(callback)
    // {
    //   axios.get(config.ConfigApi+'user/admin/access',{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // GetAdminConfig(callback)
    // {
    //   axios.get(config.ConfigApi+'user/admin/config',{ params:{token:Cookies.get('token')}}).then(function(response) {callback(response);}).catch(function(error){callback(error.response)});
    // },
    // CheckToken()
    // {
    //   return Cookies.get('token').length >0;
    // }
    
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