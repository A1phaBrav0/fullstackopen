import {useEffect, useState} from "react";
import countryService from "./services/countries.js"
import Search from "./componets/Search.jsx";
import CountryList from "./componets/ContriesList.jsx";
import Country from "./componets/Country.jsx";

const App = () => {
    const [countries, setCountries] = useState([])
    const [value, setValue] = useState("")
    const [country, setCountry] = useState(null)

    useEffect(() => {
        countryService
            .getAll()
            .then(response => setCountries(response))

    }, []);

    const filterStr = (str = value) => {
       return str.trim().length > 0
            ? countries.filter(country =>
                country
                    .name
                    .common
                    .toLowerCase()
                    .includes(str.toLowerCase().trim()))
            : []
    }

    const handleChange = (e) => {
        const str = e.target.value
        setValue(str)

        const countryLst = filterStr(str)
        countryLst.length === 1
            ? setCountry(countryLst[0])
            : setCountry(null)
    }

    const handleClick = (countryIdx) => {
        const countryLst = filterStr()
        setCountry(countryLst[countryIdx])
    }

    return (
        <>
            <Search value={value} onChange={handleChange}/>
            <CountryList searchResults={filterStr()} onClick={handleClick}/>
            <Country countryObj={country}/>
        </>
    )
}

export default App
