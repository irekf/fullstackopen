import {useState, useEffect} from "react";
import axios from "axios";

const Languages = ({languages}) => {
    const result = []
    languages.forEach((l) => result.push(<li key={l}>{l}</li>))
    return (
        <div>
            <h3>Official languages:</h3>
            <ul>{result}</ul>
        </div>
    )
}
const CountryInfo = ({countries}) => {
    if (countries.length === 1) {
        const country = countries[0]
        return (
            <p>
                <h2>{country.name.common}</h2>
                <div><b>Capital:</b> {country.capital[0]}</div>
                <div><b>Area:</b> {country.area}</div>
                <Languages languages={Object.values(country.languages)}/>
                <div style={{fontSize: '150px'}}>{country.flag}</div>
            </p>
        )
    } else if (countries.length > 10) {
        return <p>Too many matches, use a more specific filter</p>
    } else {
        const result = []
        countries.forEach((c) => {
            result.push(<li key={c.name.common}>{c.name.common}</li>)
        })
        return <p>{result}</p>
    }
}

function App() {

    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')
    const [matchingCountries, setMatchingCountries] = useState([])

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((resp) => setCountries(resp.data))
            .catch((err) => alert(`${err}`))
    }, [])

    useEffect(() => {
        setMatchingCountries(
            countries.filter((country) => countryFilter.length && country.name.common.startsWith(countryFilter))
        )
    }, [countryFilter])

    return (
        <>
            <div>
                Country filter: &nbsp; <input onChange={(e) => setCountryFilter(e.target.value)}/>
            </div>
            <CountryInfo countries={matchingCountries}/>
        </>
    )
}

export default App
