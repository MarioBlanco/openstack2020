import React, {useState, useEffect} from 'react';
import Axios from "axios";


const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [filtered, setFiltered] = useState([])
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
