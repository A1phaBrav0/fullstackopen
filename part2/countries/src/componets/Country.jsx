const Country = ({countryObj}) => {
    return (
        <div>
            <h2>{countryObj.name.common}</h2>
            <div>{`Capital: ${countryObj.capital[0]}`}</div>
            <div>{`Area: ${countryObj.area} km²`}</div>
            <h3>Languages</h3>
            <ul>
                {
                    Object.keys(countryObj.languages).map(key =>
                        <li key={key}>{countryObj.languages[key]}</li>
                    )
                }
            </ul>
            <img src={countryObj.flags.png} alt={countryObj.flags.alt}/>
        </div>
    )
}

export default Country