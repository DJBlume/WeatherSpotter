import React, { Component } from 'react';
import '../styles/forecastweather.css';
import Moment from 'moment';

export default class Forecast extends Component {

    expand() {
        if (window.innerWidth < 992) {
            var elems = document.getElementsByClassName('forecastday');
            for (var i = 0; i < elems.length; i++) {
                elems[i].classList.add("hidden");
            }
        }
        //if screen changes size, toggle "hidden" class
        window.addEventListener('resize', () => {
            if (window.innerWidth < 992) {
                var elems = document.getElementsByClassName('forecastday');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].classList.add("hidden");
                }
            } else {
                var elems = document.getElementsByClassName('forecastday');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].classList.remove("hidden");
                }
            }
        });
    }

    expandFirst = () => {
        document.getElementById("first").classList.toggle("hidden");
    }

    expandSecond = () => {
        document.getElementById("second").classList.toggle("hidden");
    }

    expandThird = () => {
        document.getElementById("third").classList.toggle("hidden");
    }

    render() {
        //today data
        const todForecast = this.props.forecast[0];
        //tomorrow data
        const tomForecast = this.props.forecast[1];
        //day after tomorrow data
        const dayForecast = this.props.forecast[2];
        const imperial = this.props.imperial;

        this.expand();

        return (
            <div className="forecastContainer">
                <div id="first" className="forecastday">
                    <h3>Today</h3>
                    <div className="description">
                        <img src={todForecast.icon} alt="weather icon"></img>
                        {todForecast.desc}
                    </div>
                    <div className="forecastTemp">
                        <p>High: {imperial && Math.round(todForecast.highF)}{!imperial && Math.round(todForecast.highC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                        <p>Low: {imperial && Math.round(todForecast.lowF)}{!imperial && Math.round(todForecast.lowC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                    </div>
                    <div className="precip">
                        <p>Chance of Rain: {todForecast.rain}%</p>
                        <p>Chance of Snow: {todForecast.snow}%</p>
                        <p>Expected Precipitation: {imperial && todForecast.totalPrecip_in + "in"}{!imperial && todForecast.totalPrecip_mm + "mm"}</p>
                    </div>
                    <div className="wind">
                        Wind: {imperial && todForecast.windSpdM + "mph"}{!imperial && todForecast.windSpdK + "kph"}
                    </div>
                    <button className="mobile_only" onClick={this.expandFirst}>Toggle Details</button>
                </div>
                <div id="second" className="forecastday">
                    <h3> {Moment(tomForecast.date).format('MM/DD/YYYY')}</h3>
                    <div className="description">
                        <img src={tomForecast.icon} alt="weather icon"></img>
                        {todForecast.desc}
                    </div>
                    <div className="forecastTemp">
                        <p>High: {imperial && Math.round(tomForecast.highF)}{!imperial && Math.round(tomForecast.highC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                        <p>Low: {imperial && Math.round(tomForecast.lowF)}{!imperial && Math.round(tomForecast.lowC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                    </div>
                    <div className="precip">
                        <p>Chance of Rain: {tomForecast.rain}%</p>
                        <p>Chance of Snow: {tomForecast.snow}%</p>
                        <p>Expected Precipitation: {imperial && tomForecast.totalPrecip_in + "in"}{!imperial && tomForecast.totalPrecip_mm + "mm"}</p>
                    </div>
                    <div className="wind">
                        Wind: {imperial && tomForecast.windSpdM + "mph"}{!imperial && tomForecast.windSpdK + "kph"}
                    </div>
                    <button className="mobile_only" onClick={this.expandSecond}>Toggle Details</button>
                </div>
                <div id="third" className="forecastday">
                    <h3>{Moment(dayForecast.date).format('MM/DD/YYYY')}</h3>
                    <div className="description">
                        <img src={dayForecast.icon} alt="weather icon"></img>
                        {dayForecast.desc}
                    </div>
                    <div className="forecastTemp">
                        <p>High: {imperial && Math.round(dayForecast.highF)}{!imperial && Math.round(dayForecast.highC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                        <p>Low: {imperial && Math.round(dayForecast.lowF)}{!imperial && Math.round(dayForecast.lowC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                    </div>
                    <div className="precip">
                        <p>Chance of Rain: {dayForecast.rain}%</p>
                        <p>Chance of Snow: {dayForecast.snow}%</p>
                        <p>Expected Precipitation: {imperial && dayForecast.totalPrecip_in + "in"}{!imperial && dayForecast.totalPrecip_mm + "mm"}</p>
                    </div>
                    <div className="wind">
                        Wind: {imperial && dayForecast.windSpdM + "mph"}{!imperial && dayForecast.windSpdK + "kph"}
                    </div>
                    <button className="mobile_only" onClick={this.expandThird}>Toggle Details</button>
                </div>
            </div>
        )
    }
}
