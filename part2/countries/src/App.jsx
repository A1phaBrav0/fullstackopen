import {useEffect, useState} from "react";
import countryService from "./services/countries.js"
import Search from "./componets/Search.jsx";
import Display from "./componets/Display.jsx";

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [value, setValue] = useState("")

    useEffect(() => {
        countryService
            .getAll()
            .then(response => setCountries(response))

    }, []);

    const filterCountries = (searchStr) => {
        if (searchStr.length > 0) {
            const results = countries.filter(country =>
                country
                    .name
                    .common
                    .toLowerCase()
                    .includes(searchStr.toLowerCase())
            )
            setSearchResults(results)
        } else setSearchResults([])
    }

    const handleChange = (e) => {
        const txt = e.target.value
        setValue(txt)
        filterCountries(txt)
    }

    return (
        <>
            <Search value={value} onChange={handleChange}/>
            <Display searchResults={searchResults} />
        </>
    )
}

export default App
