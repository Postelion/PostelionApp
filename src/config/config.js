export default {


    //ConfigApi
    ConfigApi:'http://localhost:3001/',

    //Projects
    projects:
    {
        link_repos:'https://api.github.com/users/Postelion/repos',
        connection_option:{

            method: 'GET',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer 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'
            },
        }
    },

    //Page
    listMenu:
    [
        {
            value:'',
            name:'STRONA GŁÓWNA'
        },
        {
            value:'project',
            name:'PROJEKTY'
        },
        {
            value:'cv',
            name:'CV'
        },
        {
            value:'panel',
            name:'PANEL'
        },
    ],

    //Panel
    panel:{
        services:[
            {
                name:"F1 Picker API",
                url:'/services/F1picker'
            }
        ]
    }
}