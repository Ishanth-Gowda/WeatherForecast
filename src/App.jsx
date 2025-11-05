import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./App.css";

const App = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bg, setBg] = useState("default-bg");

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);

        try {
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
            const res = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`
            );
            const data = await res.json();

            if (data.error) {
                setError(data.error.message);
                setWeather(null);
            } else {
                setWeather(data);
                const condition = data.current.condition.text.toLowerCase();

                if (condition.includes("sun") || condition.includes("clear"))
                    setBg("sunny");
                else if (condition.includes("cloud") || condition.includes("overcast"))
                    setBg("cloudy");
                else if (
                    condition.includes("rain") ||
                    condition.includes("thunderstorm") ||
                    condition.includes("drizzle")
                )
                    setBg("rainy");
                else if (condition.includes("snow") || condition.includes("patchy snow")) setBg("snowy");
                else if (condition.includes("fog") || condition.includes("mist"))
                    setBg("foggy");
                else setBg("default-bg");
            }
        } catch (err) {
            setError("Failed to fetch weather data");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.body.className = bg;
    }, [bg]);

    return (
        <div className="app-wrapper">
            <div className="background-overlay"></div>

            <div
                className={`app-container ${!weather && !loading && !error ? "center-home" : ""
                    }`}
            >
                {!weather && !loading && !error ? (
                    <div className="home-container">
                        <h1 className="welcome-text">Welcome...</h1>
                        <SearchBar onSearch={fetchWeather} />
                    </div>
                ) : (
                    <>
                        <SearchBar onSearch={fetchWeather} />
                        {loading && <p className="loading">Loading...</p>}
                        {error && <p className="error">{error}</p>}
                        {weather && (
                            <>
                                <CurrentWeather weather={weather} />
                                <Forecast forecast={weather.forecast.forecastday} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default App;