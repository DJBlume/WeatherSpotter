import React, { Component } from 'react';
import '../styles/forecastweather.css';
import Moment from 'moment';

export default class Forecast extends Component {

    //add hidden class to elements on smaller screensizes
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

    //toggle hidden elements for each individual forecast day
    expandFirst = () => {
        document.getElementById("first").classList.toggle("hidden");
    }

    expandSecond = () => {
        document.getElementById("second").classList.toggle("hidden");
    }

    expandThird = () => {
        document.getElementById("third").classList.toggle("hidden");
    }

    componentDidMount() {
        this.expand()
    }

    render() {
        //today data
        const todForecast = this.props.forecast[0];
        //tomorrow data
        const tomForecast = this.props.forecast[1];
        //day after tomorrow data
        const dayForecast = this.props.forecast[2];
        const imperial = this.props.imperial;

        return (
            <div className="forecastContainer">
                <div id="first" className="forecastday">
                    <h3>Today</h3>
                    <div className="description">
                        {todForecast.desc}
                    </div>
                    <div className="forecastTemp">
                        <p>High: {imperial && Math.round(todForecast.highF)}{!imperial && Math.round(todForecast.highC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                        <p>Low: {imperial && Math.round(todForecast.lowF)}{!imperial && Math.round(todForecast.lowC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                    </div>
                    <div className="wind">
                        <p>Wind Speed:</p>
                        <p className="number">{imperial && todForecast.windSpdM + " mph"}{!imperial && todForecast.windSpdK + " kph"}</p>
                    </div>
                    <div className="precip">
                        <div className="rain">
                            <p>Chance of Rain:</p>
                            <p className="number">{todForecast.rain}%</p>
                        </div>
                        <div className="snow">
                            <p>Chance of Snow:</p>
                            <p className="number">{todForecast.snow}%</p>
                        </div>
                    </div>
                    <div className="expected">
                        <p>Expected Precipitation:</p>
                        <p className="number">{imperial && todForecast.totalPrecip_in + " in"}{!imperial && todForecast.totalPrecip_mm + " mm"}</p>
                    </div>
                    <img src={todForecast.icon} alt="weather icon"></img>
                    <button className="mobile_only" onClick={this.expandFirst}>Details</button>
                </div>
                <div id="second" className="forecastday">
                    <h3> Tomorrow</h3>
                    <div className="description">
                        {todForecast.desc}
                    </div>
                    <div className="forecastTemp">
                        <p>High: {imperial && Math.round(tomForecast.highF)}{!imperial && Math.round(tomForecast.highC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                        <p>Low: {imperial && Math.round(tomForecast.lowF)}{!imperial && Math.round(tomForecast.lowC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                    </div>
                    <div className="wind">
                        <p>Wind Speed:</p>
                        <p className="number">{imperial && tomForecast.windSpdM + " mph"}{!imperial && tomForecast.windSpdK + " kph"}</p>
                    </div>
                    <div className="precip">
                        <div className="rain">
                            <p>Chance of Rain:</p>
                            <p className="number">{tomForecast.rain}%</p>
                        </div>
                        <div className="snow">
                            <p>Chance of Snow:</p>
                            <p className="number">{tomForecast.snow}%</p>
                        </div>
                    </div>
                    <div className="expected">
                        <p>Expected Precipitation:</p>
                        <p className="number">{imperial && tomForecast.totalPrecip_in + " in"}{!imperial && tomForecast.totalPrecip_mm + " mm"}</p>
                    </div>
                    <img src={tomForecast.icon} alt="weather icon"></img>
                    <button className="mobile_only" onClick={this.expandSecond}>Details</button>
                </div>
                <div id="third" className="forecastday">
                    <h3>{Moment(dayForecast.date).format('MMMM DD')}</h3>
                    <div className="description">
                        {dayForecast.desc}
                    </div>
                    <div className="forecastTemp">
                        <p>High: {imperial && Math.round(dayForecast.highF)}{!imperial && Math.round(dayForecast.highC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                        <p>Low: {imperial && Math.round(dayForecast.lowF)}{!imperial && Math.round(dayForecast.lowC)}&deg;{imperial && "F"}{!imperial && "C"}</p>
                    </div>
                    <div className="wind">
                        <p>Wind Speed:</p>
                        <p className="number">{imperial && dayForecast.windSpdM + " mph"}{!imperial && dayForecast.windSpdK + " kph"}</p>
                    </div>
                    <div className="precip">
                        <div className="rain">
                            <p>Chance of Rain:</p>
                            <p className="number">{dayForecast.rain}%</p>
                        </div>
                        <div className="snow">
                            <p>Chance of Snow:</p>
                            <p className="number">{dayForecast.snow}%</p>
                        </div>
                    </div>
                    <div className="expected">
                        <p>Expected Precipitation:</p>
                        <p className="number">{imperial && dayForecast.totalPrecip_in + " in"}{!imperial && dayForecast.totalPrecip_mm + " mm"}</p>
                    </div>
                    <img src={dayForecast.icon} alt="weather icon"></img>
                    <button className="mobile_only" onClick={this.expandThird}>Details</button>
                </div>
            </div>
        )
    }
}
