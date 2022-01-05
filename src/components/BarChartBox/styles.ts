import styled, {keyframes} from 'styled-components';

interface ILegendProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div`
    width: 48%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: ${ props => props.theme.color.tertiary};
    color: ${props => props.theme.color.white};
    border-radius: 7px;
    display: flex;
    animation: ${animate} .5s;

    @media (max-width: 1200px){
        display: flex;
        flex-direction: column;
        width:100%;
        height:auto;
    }
`;

export const SideLeft = styled.aside`
    padding: 30px 20px;
    flex: 1;
    > h2 {
        margin-bottom: 10px;
        padding-left: 16px;
    }
`;

export const SideRight = styled.main`
    flex: 1;
    min-height: 150px;
    display: flex;
    justify-content: center;
    padding-top: 35px;
    padding-bottom: 20px;
`;

export const LegendContainer = styled.ul`
    list-style: none;
    height: 175px;
    padding: 5px;
    overflow-y: scroll;
    
    @media (max-width: 1200px){
        display: flex;
        width:100%;
        height:auto;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.color.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-::-ms-track{
        background-color: ${props => props.theme.color.tertiary};
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    padding-right: 10px;
    margin-top: 15px;
    margin-bottom: 15px;

    > div {
        background-color: ${props => props.color};
        width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
    }

    > span {
        margin-left: 10px;
    }

`;
