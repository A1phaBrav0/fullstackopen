const CountryList = ({searchResults, onClick}) => {
    return searchResults.map(country =>
        <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => onClick(country)}>Show</button>
        </div>
    )
}

export default CountryList