import React from 'react';
import './styles/App.css';
import Axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Header from './components/Header';

const api_key = process.env.REACT_APP_API_KEY

class App extends React.Component {

  state = {
    //default location = Minneapolis, MN
    location: {
      latitude: 44.9778,
      longitude: -93.2650
    },
    //current weather and forecast data collected by API
    locationData: {},
    currentWeather: {},
    forecast: [],
    imperial: true,
    //Forecast array is undefined, delaying display of Forecast component until after array is populated
    displayForecast: false,
    //data from location input in header
    inputData: ""
  }

  getData() {
    //API call for Forecast
    Axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${this.state.location.latitude},${this.state.location.longitude}&days=3`).then(res => {

      //location data
      var loc = res.data.location;
      //current data
      var cur = res.data.current;
      //set up array to hold 3 day forecast
      const array = res.data.forecast.forecastday;
      //for each day in forecast, gather specific data and push it to the forecast state
      array.forEach((day) => {
        let forecastArray = {
          //high temp: Fahrenheight & Celsius
          highF: day.day.maxtemp_f,
          highC: day.day.maxtemp_c,
          //low temp: Fahrenheight & Celsius
          lowF: day.day.mintemp_f,
          lowC: day.day.mintemp_c,
          //chance of rain or snow
          snow: day.day.daily_chance_of_snow,
          rain: day.day.daily_chance_of_rain,
          //total precip in inches & millimeters
          totalPrecip_in: day.day.totalprecip_in,
          totalPrecip_mm: day.day.totalprecip_mm,
          //description & icon
          desc: day.day.condition.text,
          icon: day.day.condition.icon,
          //windspeed kph & mph
          windSpdK: day.day.maxwind_kph,
          windSpdM: day.day.maxwind_mph,
          date: day.date
        }

        this.state.forecast.push(forecastArray);
      });


      let currentWeather = {
        //temperature Fahrenheight & Celsius
        tempF: cur.temp_f,
        tempC: cur.temp_c,
        //temperature feels like: Fahrenheight & Celsius
        feelF: cur.feelslike_f,
        feelC: cur.feelslike_c,
        //wind direction/speed: kph & mph
        windDir: cur.wind_dir,
        windSpdM: cur.wind_mph,
        windSpdK: cur.wind_kph,
        //weather description & icon
        desc: cur.condition.text,
        icon: cur.condition.icon,
        //precipitation: inches and millimeters
        precipI: cur.precip_in,
        precipM: cur.precip_mm
      }

      //store weather data from API call
      let locationData = {
        city: loc.name,
        state: loc.region,
      }

      //add data to state
      this.setState({
        locationData: locationData,
        currentWeather: currentWeather,
        //Forecast array is undefined, delaying display of Forecast component until after array is populated
        displayForecast: true
      });
    })
  }

  componentDidMount() {
    //request location
    navigator.geolocation.getCurrentPosition((location) => {

      //store user's lat and long
      let newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      //Set new location to users latitude/longitude
      this.setState({
        location: newLocation
      })

      //retrieve and set state for current location
      this.getData();

    }, (error) => {
      //if there is an error with getting permission (permission denied), get and set states for default location
      if (error.code === error.PERMISSION_DENIED) {
        this.getData();
      }
    });
  }

  //button toggles between metric and imperial units
  handleClick = () => {
    let imperial = this.state.imperial;
    this.setState({ imperial: !imperial });
    this.forceUpdate();
  }

  //update inputData with information from header location input
  handleChange = (value) => {
    this.setState({
      inputData: value
    })
  }

  updateWeather = (event) => {
    event.preventDefault();

    //If the input is empty, do not make the api call
    if (this.state.inputData.length >= 1) {
      //API Call
      Axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${this.state.inputData}&days=3`).then(res => {

        //location data
        var loc = res.data.location;
        //current data
        var cur = res.data.current;
        //create empty array to store forecast data in
        var forecastArray = [];
        //set up array to hold 3 day forecast
        const array = res.data.forecast.forecastday;
        //for each day in forecast, gather specific data and push it to the forecast state
        array.forEach((day) => {
          let updatedForecast = {
            //high temp: Fahrenheight & Celsius
            highF: day.day.maxtemp_f,
            highC: day.day.maxtemp_c,
            //low temp: Fahrenheight & Celsius
            lowF: day.day.mintemp_f,
            lowC: day.day.mintemp_c,
            //chance of rain or snow
            snow: day.day.daily_chance_of_snow,
            rain: day.day.daily_chance_of_rain,
            //total precip in inches & millimeters
            totalPrecip_in: day.day.totalprecip_in,
            totalPrecip_mm: day.day.totalprecip_mm,
            //description & icon
            desc: day.day.condition.text,
            icon: day.day.condition.icon,
            //windspeed kph & mph
            windSpdK: day.day.maxwind_kph,
            windSpdM: day.day.maxwind_mph,
            date: day.date
          }
          forecastArray.push(updatedForecast);
        });


        let currentWeather = {
          //temperature Fahrenheight & Celsius
          tempF: cur.temp_f,
          tempC: cur.temp_c,
          //temperature feels like: Fahrenheight & Celsius
          feelF: cur.feelslike_f,
          feelC: cur.feelslike_c,
          //wind direction/speed: kph & mph
          windDir: cur.wind_dir,
          windSpdM: cur.wind_mph,
          windSpdK: cur.wind_kph,
          //weather description & icon
          desc: cur.condition.text,
          icon: cur.condition.icon,
          //precipitation: inches and millimeters
          precipI: cur.precip_in,
          precipM: cur.precip_mm
        }

        //store weather data from API call
        let locationData = {
          city: loc.name,
          state: loc.region,
        }

        //add data to state
        this.setState({
          locationData: locationData,
          currentWeather: currentWeather,
          forecast: forecastArray,
          //Forecast array is undefined, delaying display of Forecast component until after array is populated
          displayForecast: true
        })
      })
        //if input isn't empty, but location can't be found, display this alert
        .catch(function (error) {
          alert("*QUACK!* After much deliberation, we regret to inform you that the council of rubber duckies has determined the location you are looking for does not exist. Please try searching for a location currently in existence.")
        });
    }
    //if the input is empty, alert the user
    else if (this.state.inputData.length < 1) {
      alert("I am not a mind reader. Please enter the location you would like to search for.");
    }
  }

  render() {
    return (
      <div className="App">
        <Header changeLocation={this.handleChange} updateWeather={this.updateWeather} handleClick={this.handleClick} imperial={this.state.imperial} />
        <div className="current">
          <CurrentWeather locationData={this.state.locationData} currentWeather={this.state.currentWeather} imperial={this.state.imperial} />
        </div>
        <div className="forecast">
          <h2 className="componentTitle">3-Day Forecast</h2>
          {this.state.displayForecast && <Forecast forecast={this.state.forecast} imperial={this.state.imperial} />}
        </div>
      </div>
    );
  }
}

export default App;
