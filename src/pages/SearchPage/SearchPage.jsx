import './SearchPage.css'
import React, { useState, useEffect } from 'react'
import {gql, useQuery} from '@apollo/client'
import CityCard from '../../components/CityCard/CityCard'

function SearchPage(){

    const [keyword, setKeyword] = useState("")

    const handleSearch = () => {
        setKeyword(document.getElementById('keyword').value)
        console.log(keyword)
    }

    const SEARCH_QUERY = gql`
        query SearchByName($n: String!){
            getCityByName(name:$n, config: {units:metric}) {
                id
                name
                country
                coord {
                    lon
                    lat
                }
                weather {
                summary {
                    title
                    description
                    icon
                }
                temperature {
                    actual
                    feelsLike
                    min
                    max
                }
                timestamp
                }
            }
        }
    `

    const {loading, e, data} = useQuery(SEARCH_QUERY, {
        variables: {
            n: keyword
        }
    })

    console.log(data)
    var search_result = "";
    if(loading || keyword === "")
        search_result = ""
    else{
        if(!data || !data.getCityByName)
            search_result = <i className="text-warning mt-5">"{keyword}" not found</i>
        else{
            const city = data.getCityByName;
            console.log(city)
            search_result = <CityCard city={city} key={city.id}/>
        }

    }

    return(
        <div>
            <h1 className="d-flex justify-content-center text-light m-3">Search</h1>
            <h4 className="d-flex justify-content-center text-info m-3 text-center">Search for any City in the World and get the latest weather information</h4>
            
            <div className="search-page-container">
                <div className="search-container mt-3">
                    <div className="form-inline">
                        <input id="keyword" className="form-control mr-sm-2" type="search" placeholder="Search City Name" aria-label="Search" />
                        <button className="btn btn-dark " type="submit" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="search-result">{search_result}</div>
            </div>
        </div>
    )
}

export default SearchPage