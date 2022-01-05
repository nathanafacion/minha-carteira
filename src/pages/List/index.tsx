import React,{ useMemo, useState, useEffect}  from 'react';
import {Container, Content, Filters} from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../HistoryFinanceCard';
import {useLocation} from 'react-router-dom';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import ListOfMonths from '../../utils/months';
import {uuid} from 'uuidv4';

interface IData
 {
    id: string,
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC = () => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth()+1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState<string[]>(['recorrente','eventual']);    

    const type = useLocation();
    
    const pageData = useMemo(() =>{
        return type.pathname === '/list/entry-balance' ? 
        {
            label:'Entradas',
            lineColor: '#4E41F0',
            listData: gains
        }:{
            label:'Saídas',
            lineColor: '#E44C4E',
            listData: expenses
        };
    },[type]);
    

    const years =  useMemo(() => {
        let uniqueYears: number[] =[];
        pageData.listData.forEach( item =>{
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

    },[pageData]);

    const months =  useMemo(() => {
        
        return ListOfMonths.map( (month, index) =>{
            return {
                value: index + 1,
                label: month,
            }
        });

    },[]);


    const handleFrequencyClick = (frequency: string) =>{

        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if (alreadySelected >= 0){
            setFrequencyFilterSelected(frequencyFilterSelected.filter(item => item !== frequency))
        } else {
            setFrequencyFilterSelected((prev)=>[...prev,frequency])
        }
    }
    
    const stringToNumber = (valueString: string, functionSelected: CallableFunction) =>{
        try{
            const valueNumber = Number(valueString);
            functionSelected(valueNumber);
        } catch(error) {
            throw new Error('Value is invalid');
        }
    }

    useEffect(() => {
        const filteredData = pageData.listData.filter( item => {
            const date = new Date(item.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        const response = filteredData.map( item => {
            return {
                id: uuid(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41FE' : '#E44C4E'
            }
        })

        setData(response);
    }, [pageData, monthSelected, yearSelected,frequencyFilterSelected]);

    return(
        <Container>
            <ContentHeader title={pageData.label} lineColor={pageData.lineColor}>
              
                <SelectInput 
                    options={months} 
                    onChange={(e) => stringToNumber(e.target.value, setMonthSelected)} 
                    defaultValue={monthSelected}/>
                <SelectInput 
                    options={years}  
                    onChange={(e) => stringToNumber(e.target.value, setYearSelected)} 
                    defaultValue={yearSelected}/>
            </ContentHeader>
            <Filters>
                <button type="button" className={`tag-filter tag-filter-recurrent 
                    ${frequencyFilterSelected.includes('recorrente') 
                    && 'tag-actived'}`} onClick={() => handleFrequencyClick('recorrente')}>
                    Recorrentes
                </button>
                <button type="button" className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') 
                    && 'tag-actived'}`} onClick={() => handleFrequencyClick('eventual')}>
                    Eventuais
                </button>
            </Filters>
            <Content>
                {
                    data.map( item => (
                        <HistoryFinanceCard
                            key = {item.id}
                            tagColor = {item.tagColor}
                            title = {item.description}
                            subtitle = {item.dateFormatted}
                            amount ={item.amountFormatted} 
                        />
                    ))
                }
            </Content>

         </Container>
    );
}

export default List;