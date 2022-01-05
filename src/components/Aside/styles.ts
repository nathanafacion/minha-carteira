import { findByLabelText } from '@testing-library/react';
import styled, {css} from 'styled-components';
import ToggleComponent from '../Toggle/'

interface IContainerProps {
    menuIsOpen: boolean;
}

interface IThemeToggleProps {
    menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
    grid-area: AS;
    background-color:${props => props.theme.color.secondary};
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.color.gray};
    position: relative;

    @media(max-width: 600px){
        padding-left: 7px;
        position: fixed;
        z-index: 2;
        width: 200px;
        height: ${props => props.menuIsOpen ? '100vh' : '70px'};
        overflow: hidden;

        ${props => !props.menuIsOpen && css`
            border: none;
            border-bottom: 1px solid ${props => props.theme.color.gray}
        `};
    }

`;


export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 70px;
    @media(max-width: 600px){
        flex: 1;
    }
`;

export const LogImg = styled.img`
    height: 40px;
    width: 40px;
    padding: 10px;

    
    @media(max-width: 600px){
        display: none;
    }
`;

export const Title = styled.h3`
    color: ${props => props.theme.color.white};

    @media(max-width: 600px){
        display:none;
    }
`;

export const MenuItemLink = styled.a`
    color: ${props => props.theme.color.info};
    text-decoration: none;
    display:flex;
    align-items: center;
    transition: opacity .3s;
    margin: 7px 0;

    &:hover{
        opacity: .7;
    }

    > svg{
        font-size: 18px;
        margin-right:10px;

    }
`;

export const MenuItemButton = styled.button`
    font-size: 16px;
    background: none;
    border: none;
    color: ${props => props.theme.color.info};
    display:flex;
    align-items: center;
    transition: opacity .3s;
    margin: 7px 0;

    &:hover{
        opacity: .7;
    }

    > svg{
        font-size: 18px;
        margin-right:10px;

    }
`;

export const MenuContainer = styled.nav`
    display:flex;
    flex-direction: column;
    margin-top:50px;
`;

export const ToggleMenu = styled.button`
    width: 40px;
    height: 40px;
    margin:10px;
    border-radius: 5px;
    font-size: 22px;
    background-color: ${props => props.theme.color.warning};
    color: ${props => props.theme.color.white};

    transition: opacity .3s;

    &:hover {
        opacity: 0.7;
    }

    display:none;
    @media(max-width: 600px){
        display: flex;
        justify-content:center;
        align-items: center;
    
    }

`;

export const ThemeToggleFooter = styled.footer<IThemeToggleProps>`
    display:none;
    position: absolute;
    bottom: 20px;
    left: 20px;
    @media(max-width: 470px){
        display: ${props => props.menuIsOpen ? 'flex' : 'none'};
    }
  
`;

export const Toggle = styled(ToggleComponent)`
    @media(max-width: 600px){
        display:none;
    }
`;