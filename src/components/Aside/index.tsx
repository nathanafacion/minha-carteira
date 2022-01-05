import React, {useState} from 'react';
import {MdDashboard,
        MdArrowUpward,
        MdArrowDownward,
        MdExitToApp,
        MdClose,
        MdMenu
        } from 'react-icons/md'
import { Container,
         Header,
         LogImg,
         MenuContainer,
         MenuItemLink,
         MenuItemButton,
         ToggleMenu,
         Title,
         ThemeToggleFooter,
         Toggle   
        } from './styles'
import logoImg from '../../assets/logo.svg'

import {useAuth} from '../../hooks/auth';
import {useTheme} from '../../hooks/theme';



const Aside: React.FC = () => {
    const {signOut} = useAuth();
    const {toggleTheme, theme} = useTheme();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState( theme.title == 'dark'? true: false);
    
    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return(
        <Container menuIsOpen={toggleMenuIsOpened}>
            <ToggleMenu onClick={handleToggleMenu}>
                {toggleMenuIsOpened ? <MdClose/> : <MdMenu/>}
            </ToggleMenu>
            <Header>
                <LogImg src ={logoImg} alt="logo da minha carteira" />
                <Title>Minha carteira</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>
               <MenuItemLink href="/list/entry-balance">
                   <MdArrowUpward/>
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward/>
                    Saídas
                </MenuItemLink>
                <MenuItemButton onClick={signOut}>
                    <MdExitToApp/>
                    Sair
                </MenuItemButton>
            </MenuContainer>
            { toggleMenuIsOpened && (
                <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                    <Toggle
                        labelLeft="Light"
                        labelRight = "Dark"
                        checked = {darkTheme}
                        onChange ={handleChangeTheme}
                    />
                </ThemeToggleFooter>)
            }
        </Container>
        
    );
}

export default Aside;