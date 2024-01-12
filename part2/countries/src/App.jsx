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

const CountryDetails = ({country}) => {
    return (
        <p>
            <h2>{country.name.common}</h2>
            <b>Capital:</b> {country.capital[0]}
            <br/><b>Area:</b> {country.area}
            <Languages languages={Object.values(country.languages)}/>
            <span style={{fontSize: '150px'}}>{country.flag}</span>
        </p>
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

    return (<>
        <div>
            Country filter: &nbsp; <input onChange={(e) => setCountryFilter(e.target.value ? e.target.value : '')}/>
        </div>
        <CountryInfo countries={countries} filter={countryFilter}/>
    </>)
}

export default App
