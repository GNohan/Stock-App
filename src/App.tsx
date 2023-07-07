import { useState} from 'react'
import './App.css'
import StockCard from './components/StockCard';
import SearchBar from './components/SearchBar';

function App() {
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
    </div>
  )
}

export default App
