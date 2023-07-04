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
    const [info, setInfo] = useState<string[]>([]);

    async function fetchStockData(){
        console.log('fetching data');
        try {
            //API call gets the price and volume of ticker
            const res = await axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + selectedStockName + '&apikey=PXT8MQ59QVP9QVVY');
            if(res?.data?.Note){
                console.log(res);
                console.log('error getting data please wait')
            }
            else{
                console.log('called api')
                console.log(res.data['Global Quote']);
                let q: StockQuote = {
                    '1. symbol': res.data['Global Quote']['1. symbol'],
                    '2. open': res.data['Global Quote']['2. open'],
                    '3. high': res.data['Global Quote']['3. high'],
                    '4. low': res.data['Global Quote']['4. low'],
                    '5. price': res.data['Global Quote']['5. price'],
                    '6. volume':res.data['Global Quote']['1. symbol'],
                    '7. latestTradingDay': res.data['Global Quote']['1. symbol'],
                    '8. previousClose': res.data['Global Quote']['1. symbol'],
                    '9. change': res.data['Global Quote']['1. symbol'],
                    '10. changePercent': res.data['Global Quote']['1. symbol']
                }
                setStock(q);
            }
        } 
        catch (err) {

        }
    }

    useEffect(() => {setInfo(selectedStockName); console.log(getStock)}, [selectedStockName]);

    return(
        <div className='stock-card-container'>
            <CSSTransition nodeRef={nodeRef} in={flipState} timeout={300} classNames='flip'>
                <div ref={nodeRef} className='stock-card' onClick={() => {setFlipState((v) => !v); fetchStockData();}}>
                    <div className="front">
                        {info[0]}
                        {info[1]}
                        {getStock['5. price']}
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