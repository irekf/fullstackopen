import {useState, useEffect} from "react";
import axios from "axios";

const Languages = ({languages}) => {
    const result = []
    languages.forEach((l) => result.push(<li key={l}>{l}</li>))
    return (
        <>
            <h3>Official languages:</h3>
            <ul>{result}</ul>
        </>
    )
}

const api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const Weather = ({country}) => {

    const [weather, setWeather] = useState(null)

    if (weather) {
        return (
            <>
                <h2>Weather in {country.capital[0]}</h2>
                <b>Temperature:</b> {weather.main.temp} Celsius<br/>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                     alt='weather icon'/><br/>
                <b>Wind:</b> {weather.wind.speed} m/s
            </>
        )
    } else {
        const lat = country.capitalInfo.latlng[0]
        const lng = country.capitalInfo.latlng[1]
        return (
            <>
                <h2>Weather in {country.capital[0]}</h2>
                <button onClick={() => {
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
                        .then((resp) => {
                            setWeather(resp.data)
                        })
                        .catch((err) => alert(`${err}`))
                }}>Request weather
                </button>
            </>
        )
    }

}

const CountryDetails = ({country}) => {

    return (
        <>
            <h2>{country.name.common}</h2>
            <b>Capital:</b> {country.capital[0]}
            <br/><b>Area:</b> {country.area}
            <Languages languages={Object.values(country.languages)}/>
            <span style={{fontSize: '150px'}}>{country.flag}</span>
            <Weather country={country}/>
        </>
    )
}
const CountryInfo = ({countries, filter}) => {

    const [matchingCountries, setMatchingCountries] = useState([])
    const [countryDetails, setCountryDetails] = useState(null)

    useEffect(() => {
        const filteredCountries = countries.filter((country) => filter.length && country.name.common.startsWith(filter))
        setMatchingCountries(filteredCountries)
        if (filteredCountries.length === 1) {
            setCountryDetails(filteredCountries[0])
        } else {
            setCountryDetails(null)
        }
    }, [filter])

    if (matchingCountries.length > 10) {
        return <p>Too many matches, use a more specific filter</p>
    }

    if (countryDetails) {
        return <CountryDetails country={countryDetails}/>
    } else {
        const result = []
        matchingCountries.forEach((c) => {
            result.push(<li key={c.name.common}>{c.name.common} &nbsp;
                <button onClick={() => {
                    setCountryDetails(c)
                }}>show
                </button>
            </li>)
        })
        return <p>{result}</p>
    }
}

function App() {

    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((resp) => setCountries(resp.data))
            .catch((err) => alert(`${err}`))
    }, [])

    return (
        <>
            <div>
                Country filter: &nbsp; <input onChange={(e) => setCountryFilter(e.target.value ? e.target.value : '')}/>
            </div>
            <CountryInfo countries={countries} filter={countryFilter}/>
        </>
    )
}

export default App
