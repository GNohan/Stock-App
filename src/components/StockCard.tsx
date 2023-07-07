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
            stock['5. price'] = s['05. price'];
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
                <div ref={nodeRef} className='stock-card' onClick={() => {setFlipState((v) => !v);}}>
                    <div className="front">
                        <div className='stockName'>{getStock['1. symbol']}</div>
                        <div className ='dataBox price'>
                            <p>{'Close \n'}</p>
                            {'$' + parseFloat(getStock['5. price']).toFixed(2)}
                        </div>  
                    </div>
                    <div className="back">
                    Back
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default StockCard;