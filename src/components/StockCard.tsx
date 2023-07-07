import './StockCard.css';
import axios from 'axios';
import {useState, useRef, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import { StockQuote } from '../interfaces/Stock';
 
function StockCard({selectedStockName}: any){
    const nodeRef = useRef(null);
    const [flipState, setFlipState] = useState<boolean>(true);
    const [getStock, setStock] = useState<StockQuote>({
        '1. symbol': '',
        '2. open': '',
        '3. high': '',
        '4. low': '',
        '5. price': '',
        '6. volume': '',
        '7. latestTradingDay': '',
        '8. previousClose': '',
        '9. change': '',
        '10. changePercent': ''
    });

    async function fetchStockData(){
        const stock: StockQuote = {
            '1. symbol': '',
            '2. open': '',
            '3. high': '',
            '4. low': '',
            '5. price': '',
            '6. volume': '',
            '7. latestTradingDay': '',
            '8. previousClose': '',
            '9. change': '',
            '10. changePercent': ''
        };
        console.log('fetching data');
        try {
            //API call gets the price and volume of ticker
            const res = await axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + selectedStockName + '&apikey=PXT8MQ59QVP9QVVY');
            const s = res.data["Global Quote"];

            stock['1. symbol'] = s['01. symbol'];
            stock['2. open'] = s['02. open'];
            stock['3. high'] = s['03. high'];
            stock['4. low'] = s['04. low'];
            stock['5. price'] = s['05. price'];
            stock['6. volume'] = s['06. volume'];
            stock['7. latestTradingDay'] = s['07. latest trading day'];
            stock['8. previousClose'] = s['08. previous close'];
            stock['9. change'] = s['09. change'];
            stock['10. changePercent'] = s['10. change percent'];
        }
        catch (err) {
            console.log("Ticker doesn't exist. Please try again...");
            return;
        }

        setStock(stock);
    }

    useEffect(() => {
        fetchStockData();
    },[selectedStockName]);

    return(
        <div className='stock-card-container'>
            <CSSTransition nodeRef={nodeRef} in={flipState} timeout={300} classNames='flip'>
                <div ref={nodeRef} className='stock-card' >
                    <div className="front">
                        <div className='stockName'>
                            <h1>{getStock['1. symbol']}</h1>
                            <h2>{getStock['7. latestTradingDay']}</h2>
                        </div>
                        <div className ='dataBox openPrice'>
                            <p>{'Open \n'}</p>
                            {'$' + parseFloat(getStock['2. open']).toFixed(2)}
                        </div>
                        <div className='dataBox closePrice'>
                            <p>{'Close \n'}</p>
                            {'$' + parseFloat(getStock['5. price']).toFixed(2)}
                        </div>
                        <div className='dataBox change'>
                            <p>{'Change \n'}</p>
                            {'$' + parseFloat(getStock['9. change']).toFixed(2)}
                        </div>
                        <div className='dataBox percentChange'>
                            <p>{'Percent Change \n'}</p>
                            {'%' + parseFloat(getStock['10. changePercent']).toFixed(2)}
                        </div>
                        <div className='dataBox volume'>
                            <p>{'Volume \n'}</p>
                            {parseFloat(getStock['6. volume'])}
                        </div>
                        <div className='dataBox highlow'>
                            <p>{'High: $' + parseFloat(getStock['3. high']).toFixed(2)}</p>
                            <p>{'Low: $' + parseFloat(getStock['4. low']).toFixed(2)}</p>
                        </div>
                        <div className='details' onClick={() => {setFlipState((v) => !v);}}>
                            <p>Click for more details</p>
                        </div>
                    </div>
                    <div className="back">
                    Back
                        <div className='details' onClick={() => {setFlipState((v) => !v);}}>
                            <p>Back to the front</p>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default StockCard;