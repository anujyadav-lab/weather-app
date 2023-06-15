import { useState } from "react";
import axios from "axios";
import "./App.scss";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState({});
  const [inputCity,setInputCity] = useState('')

  const apiKey = "56773c13484494fc74106bbc8a9d70a4";

  const getWeatherDetails = (cityname) => {
    if (!cityname) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;
    axios
      .get(apiURL)
      .then((response) => {
        console.log("response", response.data);
        setData(response.data)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };



  const handleSearch = () =>{
    getWeatherDetails(inputCity)
  }

  const handleChangeInput = (event) =>{
    setInputCity(event.target.value)
  }


  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1>Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" value={inputCity} onChange={handleChangeInput}/>
          <button 
          onClick={handleSearch}
          className="btn btn-primary" type="button">
            Search
          </button>
        </div>
      </div>

      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img
           
            className="weatherIcons"
            src= { data?.main?.temp > 30 ?"https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png" : "https://www.creativefabrica.com/wp-content/uploads/2020/03/03/1583225088/Sunny-Weather-Icon-580x386.jpg"}
            alt="icons"
  
          />
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
