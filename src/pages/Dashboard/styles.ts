import styled from 'styled-components';


export const Container = styled.div`
    background-color: ${props => props.color};
`;

export const Content = styled.div`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
