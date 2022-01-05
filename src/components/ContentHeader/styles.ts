import styled from 'styled-components';


interface ITitleContainerProps {
    lineColor: string;
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    @media(max-width: 320px){
        flex-direction: column;
    }

`;

export const Controllers = styled.div`
    display:flex;

    @media(max-width: 320px){
       width:100%;
       justify-content:space-around;
       margin-top: 20px;
    }

`;

export const Title = styled.div<ITitleContainerProps>`
    > h2 {
        color: ${props => props.theme.color.white};

        &::after{
            content:'';
            display: block;
            width: 30px;
            border-bottom: 10px solid ${props => props.lineColor}
        }
    }

    @media(max-width: 420px){
        > h1 {
            font-size: 18px;
        }

        &::after{
            content:'';
            border-bottom: 5px solid ${props => props.lineColor}
        }
    }
`;