import React from 'react';
import '../styles/header.css';

export default function Header(props) {

    return (
        <div className="header">
            <h1 className="title"><span>Weather</span>Spotter</h1>
            <form className="location" onSubmit={(e) => { props.updateWeather(e) }}>
                <input className="location_input" name="location" placeholder="Enter City/Zip Code" onChange={(e) => props.changeLocation(e.target.value)}></input>
                <button className="submit" type="submit" value="search">Search</button>
            </form>
            <div className="toggleContainer">
                <button className="toggleUnits" onClick={(e) => props.handleClick(e)}>Imperial/Metric</button>
            </div>
        </div>
    )
}
