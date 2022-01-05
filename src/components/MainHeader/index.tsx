import React, { useMemo, useCallback } from 'react';
import { 
    Container, 
    Profile, 
    Welcome, 
    UserName,
    Toggle
} from './styles'
import emojis from '../../utils/emojis'
import { useTheme } from '../../hooks/theme';
import {useState} from 'react'

const MainHeader: React.FC = () => {
    const {toggleTheme, theme} = useTheme();

    const [darkTheme, setDarkTheme] = useState( theme.title == 'dark'? true: false);

    const emoji = useMemo(()=>{
        const indice =  Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    },[]);

    const handleChangeTheme = useCallback(() => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    },[darkTheme]);

    return(
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight = "Dark"
                checked = {darkTheme}
                onChange ={handleChangeTheme}
            />
            <Profile>
                <Welcome>Olá, </Welcome>  {emoji}
                <UserName>Nana</UserName>
            </Profile>
        </Container>
        
    );
}

export default MainHeader;