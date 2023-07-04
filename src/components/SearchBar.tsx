import axios from 'axios';
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {Stock} from '../interfaces/Stock';
import './SearchBar.css';

function SearchBar({setStockNameCallback}: any){
    const [input, setInput] = useState("");
    const [getStocks, setStocks] = useState<Stock[]>([]);
 
    const api_key = 'PXT8MQ59QVP9QVVY';
    const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=';
    const url_two = '&apikey=' + api_key;

    const fetchData = async (value: string) => {
        let temp: Stock[] = [];
        try {
            const res = await axios.get(url + value + url_two);

            res.data['bestMatches'].forEach((stock: Stock) => {
                let st: Stock = {
                    '1. symbol': stock['1. symbol'],
                    '2. name': stock['2. name'],
                    '3. type': stock['3. type'],
                    '4. region': stock['4. region'],
                    '5. marketOpen': stock['5. marketOpen'],
                    '6. marketClose':stock['6. marketClose'],
                    '7. timeZone': stock['7. timeZone'],
                    '8. currency': stock['8. currency'],
                    '9. matchScore': stock['9. matchScore']
                }

                temp.push(st);
            });
            } catch (err) {
            console.log(err);
        }
        setStocks(temp);
    }

    const handleChange = (value: string) => {
        setInput(value.toString());
        fetchData(value.toString());
    }

    return(
        <>
        <div className="input-wrapper">
            <input onBlur={() => handleChange('')} placeholder='Search for stocks' value={input} onChange={(e) => handleChange(e.target.value)}></input>
        </div>
        <ul className='results-list'>
            {getStocks.map((res:Stock) => <li className='result' key={res['1. symbol']} onClick={() => setStockNameCallback([res['1. symbol'],res['3. type'],res['6. marketClose']])}>{res['1. symbol'] + ' : ' + res['2. name']}</li>)}
        </ul>
        <FaSearch id='search-icon'/>
        </>
    );
}

export default SearchBar;
