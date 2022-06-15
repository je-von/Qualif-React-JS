import { useState } from "react";
import CityList from "../../components/CityList/CityList";

function FavoritePage(){
    var favoritesStr = localStorage['favorite_city'] || '';
    var temp = []
    if(favoritesStr !== ''){
        temp = favoritesStr.split(',')
    }

    const [favoriteArr, setFavoriteArr] = useState(temp)

    const removeBtnHandler = (id) => {
        temp = temp.filter(c => c !== id)
        localStorage.setItem("favorite_city", temp.toString());
        setFavoriteArr(temp)
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center text-light m-3">Favorite</h1>
            <h4 className="d-flex justify-content-center text-info m-3 text-center">Every Cities you've marked as your favorite</h4>
            
            <CityList id={favoriteArr} removeBtnHandler={removeBtnHandler}/>
        </div>
    )
}

export default FavoritePage