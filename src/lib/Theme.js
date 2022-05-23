

const LightTheme = {
    NavBarColor:'#fafafa',
    FontColor:'#3b4f76',
    NavBarSecondColor:'#e0e0e0',
    NavBarColorIconDisable:'#76849f',
    NavBarColorIconActive:'#3b4f76',
    Background:'#ebecef'
}

const DarkTheme = { 
    NavBarColor:'#363f5e',
    FontColor:'#ebecef',
    NavBarSecondColor:'#2b324b',
    NavBarColorIconDisable:'#72798e',
    NavBarColorIconActive:'#ebecef',
    Background:'#262c42'
}

export function ChangeTheme()
{
    document.documentElement.style.setProperty('--logo-color', newColor);
}