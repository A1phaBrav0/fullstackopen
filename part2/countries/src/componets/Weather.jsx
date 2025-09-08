import weatherService from "../services/weather.js"
import {useEffect, useState} from "react";

const Weather = ({city}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        weatherService
            .getCurrentWeather(city)
            .then(response => {
                setWeather(response)
            })
    }, [weather]);

    if (!weather)
        return  null

    return (
        <>
            <h2>{`Weather in ${city}`}</h2>
            <div>{`Temperature: ${weather.current.temp_c} Celsius`}</div>
            <img src={weather.current.condition.icon} alt=""/>
            <div>{`Wind: ${weather.current.wind_mph} mph`}</div>
        </>

    )

}

export default Weather