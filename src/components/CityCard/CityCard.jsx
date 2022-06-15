import { Link } from 'react-router-dom'
import './CityCard.css'

function CityCard(props){
    const city = props.city
    const removeBtnHandler = props.removeBtnHandler

    var removeBtn = ""
    if(removeBtnHandler !== null && removeBtnHandler !== undefined){
        removeBtn = <button className="btn btn-outline-danger mt-2" onClick={() => removeBtnHandler(city.id)}>Remove from Favorites</button>
    }

    return(
        <div className="card text-white bg-dark mb-3 city-card" key={city.id}>
                <h2 className="card-header">
                    {city.name}, {city.country}
                </h2>
            <div className="card-body city-content">
                <div className="city-card-body">
                    <img className="card-img-top" src={`http://openweathermap.org/img/wn/${city.weather.summary.icon}@4x.png`} alt="" />
                    <div>
                        <h4 className="card-title">{city.weather.temperature.actual} °C</h4>
                        <p className="card-text">Feels like {city.weather.temperature.feelsLike} °C</p>
                        <p className="card-subtitle">{city.weather.summary.title}</p>
                    </div>
                </div>
                <Link to={`/detail/${city.id}`} className="btn btn-outline-info">Details</Link>
                {removeBtn}
            </div>
        </div>
    )
}
export default CityCard