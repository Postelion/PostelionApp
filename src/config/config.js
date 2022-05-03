export default {

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
    ]
}