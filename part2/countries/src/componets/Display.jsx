import Country from "./Country.jsx"

const Display = ({searchResults, onClick}) => {
    const len = searchResults.length
    switch (true) {
        case (len > 10):
            return <p>Too many matches, specify another filter</p>
        case (len > 1):
            return searchResults.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => onClick(country)}>Show</button>
                </div>
            )
        case (len === 1):
            const [country] = searchResults
            return <Country countryObj={country} />
        default:
            return null
    }
}

export default Display
