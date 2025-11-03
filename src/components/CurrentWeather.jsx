import React from "react";

const CurrentWeather = ({ weather }) => {
    const { current, location } = weather;

    return (
        <div className="current-weather card">
            <h2>{location.name}, {location.country}</h2>
            <img src={current.condition.icon} alt={current.condition.text} />
            <h1>{current.temp_c}°C</h1>
            <p>{current.condition.text}</p>
            <div className="details">
                <p>Humidity: {current.humidity}%</p>
                <p>Wind: {current.wind_kph} km/h</p>
            </div>
        </div>
    );
};

export default CurrentWeather;