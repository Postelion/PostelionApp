import Cookies from 'js-cookie';

export default {


    //ConfigApi
    ConfigApi:'http://localhost:3001/',

    //Styles
    Theme:
    {
        Light:
        {
            NavBarColor:'#fafafa',
            FontColor:'#3b4f76',
            NavBarSecondColor:'#e0e0e0',
            NavBarColorIconDisable:'#76849f',
            NavBarColorIconActive:'#3b4f76',
            Background:'#ebecef'
        },
        Dark:
        {
            NavBarColor:'#363f5e',
            FontColor:'#ebecef',
            NavBarSecondColor:'#2b324b',
            NavBarColorIconDisable:'#72798e',
            NavBarColorIconActive:'#ebecef',
            Background:'#262c42'
        }
    },
    GetTheme()
    {
        if(Cookies.get('theme')=='dark') return this.Theme.Dark;
        else {return this.Theme.Light;}
    },
    GetThemeName()
    {
        return Cookies.get('theme');
    },
    ToogleTheme()
    {
        if(Cookies.get('theme')=='light') Cookies.set('theme','dark');
        else Cookies.set('theme','light');
        window.location.reload(false);
        
        
    }
}