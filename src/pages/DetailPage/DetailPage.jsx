import { gql, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import './DetailPage.css'

function DetailPage(){
    let {id} = useParams()

    var favoritesStr = localStorage['favorite_city'] || '';
    // console.log(favoritesStr)
    var favorite = []
    if(favoritesStr !== ''){
        favorite = favoritesStr.split(',')
    }
    // console.log(favorite)

    var temp = false
    if(favorite.includes(id))
        temp = true
    
    const [isFavorite, setFavorite] = useState(temp)

    const CITY_QUERY = gql`
        query GetCities($i:[String!]){
            getCityById(id:$i, config: {units:metric}) {
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
                    wind {
                        speed
                        deg
                    }
                    clouds {
                        all
                        visibility
                        humidity
                    }
                    timestamp
                }
            }
        }
    `
    const {loading, error, data} = useQuery(CITY_QUERY, {
        variables: {
            i: [`${id}`]
        }
    })

    if(loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

    const handleButton = () => {
        if(!isFavorite){
            setFavorite(true)
            if(favoritesStr !== ''){
                favoritesStr += `,${id}`
            }
            else{
                favoritesStr = id
            }
            favorite.push(id)
            localStorage.setItem("favorite_city", favoritesStr);
        }
        else{
            setFavorite(false)
            favorite = favorite.filter(c => c !== id)
            localStorage.setItem("favorite_city", favorite.toString());
        }
            
        // console.log(keyword)
    }   
    var btn = ""
    if(!isFavorite)
        btn = <button className="btn btn-outline-success" onClick={handleButton}>Add to Favorites</button>
    else
        btn = <button className="btn btn-outline-danger" onClick={handleButton}>Remove from Favorites</button>

    const city = data.getCityById[0];
    console.log(city)
    return(
        <div className="detail-container container">
            <div className="card text-white bg-dark">
                <div className="card-header detail-title">
                    <h2>{city.name}, {city.country}</h2>
                    <div className="detail-weather">
                        <h4>{city.weather.temperature.actual} °C</h4>
                        <img src={`http://openweathermap.org/img/wn/${city.weather.summary.icon}@4x.png`} alt="" />
                    </div>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-3 text-muted">({city.coord.lon}, {city.coord.lat})</h6>
                    <p className="card-text">Feels like {city.weather.temperature.feelsLike} °C</p>
                    <p className="card-text">{city.weather.summary.title} ({city.weather.summary.description})</p>
                    <p className="card-text">Wind: {city.weather.wind.speed}m/s {city.weather.wind.deg}°</p>
                    {btn}  
                </div>
            </div>
        </div>
    )
}

export default DetailPage