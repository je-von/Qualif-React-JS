import CityList from '../../components/CityList/CityList'


function HomePage(){
    // ID dari 20 kota di Indonesia
    const id = ['1642911', '1635882', '1640344', '1625084', '1642858', '1627896', '1625822', '1636722', '1621177', '1625812', '1631761', '1650357', '1645528', '8056415', '1214520', '1215502', '2057087', '1630789', '1622786', '1636884']
    // console.log(id)
    return(
        <div>
            <h1 className="d-flex justify-content-center text-light m-3">J-WeatherApp</h1>
            <h4 className="d-flex justify-content-center text-info m-3 text-center">Get updated about the Weather in your favorite City</h4>
            <CityList id={id}/>

        </div>
    )
}

export default HomePage