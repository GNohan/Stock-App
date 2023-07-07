import { useState} from 'react'
import './App.css'
import StockCard from './components/StockCard';
import SearchBar from './components/SearchBar';

function App() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [selectedStockName, setSelectedStockName] = useState<string>();

  const setStockNameCallback = (name:any) => {
    setSelectedStockName(name);
  }

  return (
    <div className="App">
      <div className='SearchBarContainer'>
        <SearchBar setStockNameCallback={setStockNameCallback}/>
      </div>
      <StockCard selectedStockName={selectedStockName}/>
      <div className='watchlist'>
        <div className='title'>Watchlist</div>
      </div>
    </div>
  )
}

export default App
