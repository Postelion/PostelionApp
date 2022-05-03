import axios from 'axios';
import config from '../config/config';

export default
{
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


}