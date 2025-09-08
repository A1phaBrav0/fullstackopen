import {useEffect, useState} from "react";
import countryService from "./services/countries.js"
import Search from "./componets/Search.jsx";
import Display from "./componets/Display.jsx";

const App = () => {
    const [countries, setCountries] = useState([])
    const [value, setValue] = useState("")

    useEffect(() => {
        countryService
            .getAll()
            .then(response => setCountries(response))

    }, []);

    const searchResults = value.length > 0
        ? countries.filter(country =>
            country
                .name
                .common
                .toLowerCase()
                .includes(value.toLowerCase()))
        : []

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleClick = (countryObj) => {
        setValue(countryObj.name.common)
        console.log(searchResults)
    }

    return (
        <>
            <Search value={value} onChange={handleChange}/>
            <Display searchResults={searchResults} onClick={handleClick}/>
        </>
    )
}

export default App
