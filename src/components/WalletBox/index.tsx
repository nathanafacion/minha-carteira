import React, {useMemo} from 'react';
import { Container } from './styles'
import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import CountUp from 'react-countup';

interface IWalletBoxProps {
    title:string;
    amount: number;
    footerlabel: string;
    icon: 'dolar' | 'arrowUp' | 'arrowDown';
    color: string;

}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount, 
    footerlabel,
    icon,
    color
}) => {
    const iconImg = useMemo(() => {
        switch(icon){
            case 'dolar':
                return dolarImg;
            case 'arrowUp':
                return arrowUpImg;
            case 'arrowDown':
                return arrowDownImg;
            default:
                return dolarImg; 
        }
    },[icon]);

    return(
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>
                    R$
                </strong>
                <CountUp 
                    end ={amount}
                    separator = "."
                    decimal = ","
                    decimals = {2}
                    preserveValue={true}
                    duration = {2}
                />
            </h1>
            <small>{footerlabel}</small>
            <img src={iconImg} alt={title} />
        </Container>
        
    );
}

export default WalletBox;