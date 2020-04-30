import React, {useState, useEffect} from 'react';
import Axios from "axios";


const App = () => {
    //for the weather
    const api_key = process.env.REACT_APP_API_KEY

    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [filtered, setFiltered] = useState([])
    const [weatherCountry, setWeatherCountry] = useState([])
    useEffect(() => {
        Axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
                setFiltered(response.data)
            })
    }, [])

    useEffect(() => {
        setFiltered(countries.filter(c => c.name.toUpperCase().includes(newFilter.toUpperCase())))
    }, [newFilter])

    useEffect(() => {
        console.log("weather")
        if (filtered.length !=1)
            return

        const params = {
            access_key: api_key,
            query: filtered[0].capital
        }
        Axios.get('http://api.weatherstack.com/current', {params})
            .then(response => {
                const apiResponse = response.data;
                setWeatherCountry(apiResponse)
                console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
            }).catch(error => {
            console.log(error)
        })
    }, [filtered])

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const handleClickShow = (event) => {
        event.preventDefault()
        if (event.target.value)
            setNewFilter(event.target.value)


    }

    const Country = ({country}) => {
        return (

            <li>
                <form>
                    {country.name}
                    <button type="submit" onClick={handleClickShow} value={country.name}>show</button>
                </form>
            </li>

        )
    }

    const ShowWeather = () => {
        if(weatherCountry.length===0)
            return(
                <div></div>
            )
        return (
            <div>
                <h2>Weather in {weatherCountry.location.name}</h2>
                <h4>temperature:</h4> {weatherCountry.current.temperature} ℃
                <br/>
                <img width={90} height={90} src={weatherCountry.current.weather_icons[0]}/>
                <h4>wind: </h4> {weatherCountry.current.wind_speed} mph direction {weatherCountry.current.dir}
            </div>
        )
    }

    const ListCountries = ({countries}) => {
        if (filtered.length === 0) {
            return (
                <div>
                    No match found, sorry!
                </div>
            )
        }
        if (filtered.length === 1) {
            let theCountry = {
                name: filtered[0].name,
                capital: filtered[0].capital,
                population: filtered[0].population,
                languages: filtered[0].languages,
                flag: filtered[0].flag
            }


            return (
                <div>
                    <h1>{theCountry.name}</h1>
                    capital {theCountry.capital}
                    <br/>
                    population {theCountry.population}
                    <h2>languages</h2>
                    <ul>
                        {theCountry.languages.map(
                            language =>
                                <li key={language.name}>
                                    {language.name}
                                </li>
                        )}
                    </ul>
                    <img width={150} height={150} src={theCountry.flag}/>
                    <ShowWeather/>
                </div>
            )
        }
        if (filtered.length < 10) {
            return (
                <div>

                    <ul>
                        {countries.map(
                            country => {
                                return (
                                    <div key={country.name}>
                                        <Country country={country}/>
                                    </div>
                                )
                            }
                        )}
                    </ul>

                </div>
            )
        }
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    return (
        <div>
            <div>
                <form>
                    find countries <input
                    value={newFilter}
                    onChange={handleFilterChange}
                />
                </form>
            </div>
            <div>
                <ListCountries countries={filtered}/>
            </div>
        </div>
    );
}

export default App;
