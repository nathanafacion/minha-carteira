import {
    Container,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend
} from './styles'

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';
import React from 'react';

interface IPieChartProps {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[];
}

/* Componente sem estado, mais perfomático */
const PieChartBox: React.FC<IPieChartProps> = ({data}) => {
    return (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
            <LegendContainer>

                {
                    data.map(indicator =>
                        <Legend key = {indicator.name} color = {indicator.color}>
                            <div>{indicator.percent}</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    )
                }
            </LegendContainer>
        </SideLeft>
        <SideRight>
            <ResponsiveContainer>
                <PieChart>
                    <Pie 
                        data = {data}
                        dataKey = "percent"
                    >
                        {
                            data.map((indicator) => (
                                <Cell key = {indicator.name} fill = {indicator.color}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
    );
}

export default PieChartBox;