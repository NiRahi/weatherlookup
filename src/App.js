import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY_UNITS = '&units=metric&appid=340364e53bc21b0b697dfe21cea238a3'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [city, setCity] = useState('Oulu');
  const [cityName, setCityName] = useState("");
  const [items, setItems] = useState();
  /*temp:'',
    feels_like: '',
    country: '',
    weatherDesc:'',
    windSpeed:'',
    iconValue:'',*/

  const modCityName = () => {
    setCity(cityName)
  }

  useEffect(() => {

    const address = URL + city + API_KEY_UNITS
    let tempValues = {};
    axios.get(address)
      .then((response) => {
        console.log(response)
        tempValues = {
          "temp": response.data.main.temp,
          "feels_like": response.data.main.feels_like,
          "windSpeed": response.data.wind.speed,
          "countryCode": response.data.sys?.country ,
          "weatherDesc": response.data.weather[0]?.description,
        }

        setItems(items => ({
          ...items,
          ...tempValues
        })



        )
        setisLoaded(true);

      }).catch(error => {
        setError(error);
      });


  }, [city])

  if (error) {
    return <p> {error.message} </p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
  }   else {
    return (
      <div class="container-fluid">
        <h1>Weather lookup!</h1>
        <div>
          <h2>Search for city</h2>
          <h1>{city.toUpperCase()}</h1>
          <h2>{items.country}</h2>
          <input placeholder="City search.." value={cityName} onChange={e => setCityName(e.target.value)} ></input>
          <button onClick={modCityName}>Search!</button>
          <div class="Text">
          <p>Temperature {items.temp} Celcius</p>
          <p>Feels like {items.feels_like} Celcius</p>
          <p>Wind Speed: {items.windSpeed} m/s</p>
          <p>Weather Description: {items.weatherDesc.toUpperCase()}</p>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
