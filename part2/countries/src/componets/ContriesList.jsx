const CountryList = ({searchResults, onClick}) => {
    const len = searchResults.length
    switch (true) {
        case (len > 10):
            return <p>Too many matches, specify another filter</p>
        case (len > 1):
            return searchResults.map((country, index) =>
                <div key={index}>
                    {country.name.common}
                    <button onClick={() => onClick(index)}>Show</button>
                </div>
            )
    }
}

export default CountryList