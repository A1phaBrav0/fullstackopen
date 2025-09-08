import Country from "./Country.jsx"
import CountryList from "./ContriesList.jsx";

const Display = ({searchResults, onClick}) => {
    const len = searchResults.length
    switch (true) {
        case (len > 10):
            return <p>Too many matches, specify another filter</p>
        case (len > 1):
            return <CountryList searchResults={searchResults} onClick={onClick}/>
        case (len === 1):
            const [country] = searchResults
            return <Country countryObj={country}/>
        default:
            return null
    }
}

export default Display
