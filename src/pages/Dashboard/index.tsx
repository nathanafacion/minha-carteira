import React, {useState, useMemo, useCallback} from 'react';
import { Container, Content } from './styles';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import ListOfMonths from '../../utils/months';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth()+1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const data = [...gains, ...expenses]

    const years =  useMemo(() => {
        let uniqueYears: number[] =[];
        data.forEach( item =>{
            const date = new Date(item.date);
            const year = date.getFullYear();
            if (!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map( year =>{
            return {
                value: year,
                label: year,
            }
        });

    },[data]);

    const months =  useMemo(() => {
        
        return ListOfMonths.map( (month, index) =>{
            return {
                value: index + 1,
                label: month,
            }
        });

    },[]);

    const totalExpenses = useMemo(() =>{
        let total: number = 0;
        expenses.forEach( item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total = total + Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number');
                }
            }

        });
        return total; 
    },[monthSelected,yearSelected]);

    const totalGains = useMemo(() =>{
        let total: number = 0;
        gains.forEach( item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total = total + Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number');
                }
            }

        });
        return total; 
    },[monthSelected,yearSelected]);

    const total = useMemo(() =>{
        const result = totalGains - totalExpenses; 
        if( result > 0 ){
            return {
                title : "Muito bem!",
                description : "Sua carteira está positivo.",
                icon : happyImg,
                footerText : "Continue assim. Considere investir esse dinheiro."
            }
        } else {
            return {
                title : "Que pena!",
                description : "Neste mês você gastou mais do que deveria",
                icon : sadImg,
                footerText : "Verifique seus gastos e tente cortar algumas coisas desnecessárias."
            }
        }
    },[totalExpenses,totalGains])

    const relationExpensesVersusGains = useMemo(() =>{
        const total = totalGains + totalExpenses;
        let percentGains
        let percentExpenses
        if( total != 0){
            percentGains = (totalGains / total) * 100;
            percentExpenses = (totalExpenses / total) * 100;
        } else {
            percentGains = 0
            percentExpenses = 0
        }

        const data = [
            {
                name: "Entradas",
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#E44C4E'
            },
            {
                name: "Saídas",
                value: totalGains,
                percent: Number(percentGains.toFixed(1)),
                color: '#F7931B'
            },
        ]
        return data;
    },[totalExpenses,totalGains])


    const stringToNumber = useCallback((valueString: string, functionSelected: CallableFunction) =>{
        try{
            const valueNumber = Number(valueString);
            functionSelected(valueNumber);
        } catch(error) {
            throw new Error('Value is invalid');
        }
    },[]);
    
    const relationExpensevesRecurrentVersusEvental = useMemo(() =>{
        let amountRecurrent = 0;
        let amountEventual = 0;
        
        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth();
            return month === monthSelected && year === yearSelected;
        }).forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount);
            }
            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount);
            }
            
            
        });
        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number((100*(amountRecurrent)/total).toFixed(1))
        const percentEventual = Number((100*(amountEventual)/total).toFixed(1))        

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]
    },[monthSelected, yearSelected]);


    const relationGainsRecurrentVersusEvental = useMemo(() =>{
        let amountRecurrent = 0;
        let amountEventual = 0;
        
        gains.filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth();
            return month === monthSelected && year === yearSelected;
        }).forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount);
            }
            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount);
            }
            
            
        });
        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number((100*(amountRecurrent)/total).toFixed(1))
        const percentEventual = Number((100*(amountEventual)/total).toFixed(1))
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0 ,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]
    },[monthSelected, yearSelected]);



    const historyData = useMemo(() => {
        return ListOfMonths
        .map((_, month) => {
            
            var amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelected){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }
                }
            });

            var amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }
                }
            });

            return {
                monthNumber: month,
                month: ListOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        });
    },[yearSelected]);
    
  
    return(
        <>
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput 
                    options={months} 
                    onChange={(e) => stringToNumber(e.target.value, setMonthSelected)} 
                    defaultValue={monthSelected}/>
                <SelectInput 
                    options={years}  
                    onChange={(e) => stringToNumber(e.target.value, setYearSelected)} 
                    defaultValue={yearSelected}/>
            </ContentHeader>
        </Container>
        <Content>
            <WalletBox 
                title = "Saldo" 
                footerlabel = "atualizado com base nas entradas e saídas"
                amount = {totalGains - totalExpenses}
                icon = 'dolar'
                color = "#4E41F0"
            />
              <WalletBox 
                title = "Entradas" 
                footerlabel = "atualizado com base nas entradas e saídas"
                amount = {totalGains}
                icon = 'arrowUp'
                color = "#F7931B"
            />

            <WalletBox 
                title = "Saídas" 
                footerlabel = "atualizado com base nas entradas e saídas"
                amount = {totalExpenses}
                icon = 'arrowDown'
                color = "#E44C4E"
            />

            <MessageBox
                title = {total.title}
                description = {total.description}
                icon = {total.icon}
                footerText = {total.footerText}
            />

            <PieChartBox data={relationExpensesVersusGains}/>
            <HistoryBox
                data = {historyData}
                lineColorAmountEntry = "#F7931B"
                lineColorAmountOutput = "#E44C4E"
            />
            <BarChartBox title={"Saídas"} data={relationExpensevesRecurrentVersusEvental}/>
            <BarChartBox title={"Entradas"} data={relationGainsRecurrentVersusEvental}/>
            
        </Content>
        </>
    );
}



export default Dashboard;