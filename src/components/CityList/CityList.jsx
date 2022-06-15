import { gql, useQuery } from "@apollo/client";
import CityCard from "../CityCard/CityCard";
import './CityList.css'

function CityList(props){
    const id = props.id
    const removeBtnHandler = props.removeBtnHandler

    const CITY_QUERY = gql`
        query GetCities($i:[String!]){
            getCityById(id:$i, config: {units:metric}) {
                id
                name
                country
                weather {
                    summary {
                        title
                        icon
                    }
                    temperature {
                        actual
                        feelsLike
                    }
                }
            }
        }
    `
    const {loading, error, data} = useQuery(CITY_QUERY, {
        variables: {
            i: id
        }
    })

    // console.log(data)

    if(loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    const cities = data.getCityById;
    return(
        <div className="city-container">
            {cities?.map(c => {
                return(
                    <CityCard city={c} key={c.id} removeBtnHandler={removeBtnHandler}/>
                )
            })}
        </div>
    )

}

export default CityList