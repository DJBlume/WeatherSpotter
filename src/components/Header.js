import React from 'react';
import '../styles/header.css';

export default function Header(props) {

    return (
        <div className="header">
            <h1 className="title">WeatherSpotter</h1>
            <form className="location" onSubmit={(e) => { props.updateWeather(e) }}>
                <label htmlFor="location">Search Location: </label>
                <input className="location_input" name="location" placeholder="City/Zip" onChange={(e) => props.changeLocation(e.target.value)}></input>
                <input className="submit" type="submit"></input>
            </form>
            <div className="toggleContainer">
                <button className="toggleUnits" onClick={(e) => props.handleClick(e)}>Imperial/Metric</button>
            </div>
        </div>
    )
}
