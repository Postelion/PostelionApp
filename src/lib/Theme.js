import * as Iconsai  from "react-icons/ai";
import * as Iconsbs  from "react-icons/bs";
import * as Iconsmd  from "react-icons/md";
import * as Iconsgr  from "react-icons/gr";
import * as Iconsbi  from "react-icons/bi";
import * as Iconsim  from "react-icons/im";
import Cookies from 'js-cookie';

const LightTheme = [
    {
        name:'NavBarColor',
        value:'#fafafa'
    },
    {
        name:'FontColor',
        value:'#3b4f76'
    }, 
    {
        name:'NavBarSecondColor',
        value:'#e0e0e0'
    }, 
    {
        name:'NavBarColorIconDisable',
        value:'#76849f'
    },
    {
        name:'NavBarColorIconActive',
        value:'#3b4f76'
    },
    {
        name:'Background',
        value:'#ebecef'
    },
    {
        name:'logo',
        value:'url("/static/logo.svg")'
    },
    {
        name:'LoadingColor',
        value:'#242424' 
    }
]

const DarkTheme = [
    {
        name:'NavBarColor',
        value:'#363f5e'
    },
    {
        name:'FontColor',
        value:'#ebecef'
    }, 
    {
        name:'NavBarSecondColor',
        value:'#2b324b'
    }, 
    {
        name:'NavBarColorIconDisable',
        value:'#72798e'
    },
    {
        name:'NavBarColorIconActive',
        value:'#ebecef'
    },
    {
        name:'Background',
        value:'#262c42'
    },
    {
        name:'logo',
        value:'url("/static/logo2.svg")'
    },
    {
        name:'LoadingColor',
        value:'white' 
    }
]

export default {

    ThemeInit()
    {
        const theme = this.GetTheme();
        for (let index = 0; index < theme.length; index++) {
            document.documentElement.style.setProperty('--'+theme[index].name, theme[index].value);
        }
    },

    GetTheme(asText = false)
    {
        if(asText)
        {
            if(Cookies.get('theme')=='light') return 'light';
            else return 'dark'; 
        }
        if(Cookies.get('theme')=='light') return LightTheme;
        else return DarkTheme;
    },

    ChangeTheme()
    {
        if(Cookies.get('theme')=='light') Cookies.set('theme','dark');
        else Cookies.set('theme','light');
        const theme = this.GetTheme();

        for (let index = 0; index < theme.length; index++) {
            document.documentElement.style.setProperty('--'+theme[index].name, theme[index].value);
        }
        
    },

    GetIcon(name)
    {
        let Icon = (Iconsai[name]);
        if(Icon==null) Icon = (Iconsbs[name])
        if(Icon==null) Icon = (Iconsmd[name])
        if(Icon==null) Icon = (Iconsgr[name])
        if(Icon==null) Icon = (Iconsbi[name])
        if(Icon==null) Icon = (Iconsim[name])
        return Icon;
    }
};