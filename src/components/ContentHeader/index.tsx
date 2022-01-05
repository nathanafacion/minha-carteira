import React from 'react';
import { Container, Controllers, Title } from './styles'

interface IContentHeaderProps {
    title: string;
    lineColor: string;
    children: React.ReactNode;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
    title, lineColor, children
}) => {

    return(
        <Container>
            <Title lineColor={lineColor}>
               <h2>{title}</h2>
            </Title>
            <Controllers>
                {children}
            </Controllers>

        </Container>
        
    );
}

export default ContentHeader;