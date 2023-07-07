import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import './SearchBar.css';

function SearchBar({setStockNameCallback}: any){
    const [input, setInput] = useState<string>("");

    const handleChange = (value: string) => {
        setInput(value.toString());
    }

    function enterStockName(){
        console.log(input);
        setStockNameCallback(input);
        setInput('');
    }

    return(
        <>
        <div className="input-wrapper">
            <input placeholder='Search for stocks' value={input} onChange={(e) => handleChange(e.target.value)}></input>
        </div>
        <FaSearch id='search-icon' onClick={enterStockName}/>
        </>
    );
}

export default SearchBar;
