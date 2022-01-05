import styled,  {keyframes} from "styled-components";

const animate = keyframes`
    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 48%;
    height: 260px;
    margin: 10px 0;
    background-color: ${ props => props.theme.color.tertiary};
    color: ${props => props.theme.color.white};
    border-radius: 7px;
    display: flex;
    animation: ${animate} .5s;

    @media(max-width: 770px){
        width: 100%;
        height: auto;
        display:flex;
`;


export const SideLeft = styled.aside`
    padding: 30px 20px;

    > h2 {
        margin-bottom: 20px;
    }

`;

export const SideRight = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
`;

export const LegendContainer = styled.ul`
    list-style: none;
    height: 175px;
    padding: 5px;
    overflow-y: scroll;
    
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
    margin-bottom: 7px;

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
