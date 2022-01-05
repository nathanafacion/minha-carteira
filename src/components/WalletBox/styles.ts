import styled from 'styled-components';

interface IContainerProps {
    color:string;
}

export const Container = styled.div<IContainerProps>`
    background-color: ${props => props.color};
    width:32%;
    height: 150px;
    margin: 10px 0;
    color: ${props => props.theme.color.white};
    border-radius: 7px;
    padding: 10px 20px;
    position: relative;
    overflow: hidden;

    > img {
        position: absolute;
        top:0px;
        right:0px;
        height:100%;
        opacity: 0.3;
    }

    > span {
        font-size: 20px;
        font-weight: 500;
    }

    > small {
        position: absolute;
        font-size: 12px;
        bottom: 10px;
    }

    @media(max-width: 770px){
        > span{
            font-size: 14px;
        }

        > h1 {
            word-wrap: break-word;
            font-size: 18px;

            > strong {
                display: inline-block;
                width: 100%;
                font-size: 14px;
            }
        }
    }

    @media(max-width: 420px){
        width: 100%;

        > h1 {
            display: flex;
            
            strong {
                position: initial;
                width: auto;
                font-size:22px;
            }

            strong:after {
                display: inline-block;
                content: '';
                width: 1px;
            }
        }
    }
`;