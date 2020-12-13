import React, { Component } from 'react';
import '../styles/currentweather.css';


export default class CurrentWeather extends Component {

    render() {
        const { tempF, tempC, feelF, feelC, windDir, windSpdM, windSpdK, desc, icon, precipI, precipM } = this.props.currentWeather;
        const imperial = this.props.imperial;
        const { city, state } = this.props.locationData;

        return (
            <div className="currentWeather">
                <div className="selectedLocation">
                    <h2>{city}, {state}</h2>
                </div>
                <div className="top">
                    <div className="temp">
                        <h2>{imperial && Math.round(tempF)}{!imperial && Math.round(tempC)}&deg;{imperial && "F"}{!imperial && "C"}</h2>
                        <div className="realfeel">
                            Feels like: {imperial && Math.round(feelF)}{!imperial && Math.round(feelC)}&deg;
                    </div>
                    </div>
                    <div className="desc_container">
                        <div className="iconFrame">
                            <img src={icon} alt="weather icon"></img>
                        </div>
                        <div className="description">
                            {desc}
                        </div>
                    </div>
                </div>
                <div className="current_group">
                    <div className="windSpd">
                        <span>Wind Speed:</span>
                        <div>
                            {imperial && windSpdM + " mph"}{!imperial && windSpdK + " kph"}
                        </div>
                    </div>
                    <div className="windDir">
                        <span>Wind Direction:</span>
                        <div>
                            {windDir}
                        </div>
                    </div>
                    <div className="precip">
                        <span>Precipitation:</span>
                        <div className="total">
                            {imperial && precipI + " in"}{!imperial && precipM + " mm"}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
