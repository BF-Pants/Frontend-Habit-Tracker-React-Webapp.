import { useEffect, useState } from 'react';
import './WeatherWidget.css';

// The weather displayed is set to the city of Rotterdam
const LAT = 51.9244;
const LON = 4.4777;

function WeatherWidget() {
    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        async function loadWeatherData() {
            try {
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

                if (!apiKey) {
                    console.error('No API key found.');
                    return
                } // response gives us a weather forecast for 5 days containing 3, 3-hour forecasts per day.
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${apiKey}&units=metric`
                );

                if (!response.ok) {
                    console.error("Failed to fetch weather data")
                }
                const data = await response.json();

                const dailyWeatherData = {};
                // Groups each entry by date.
                data.list.forEach((item) => {
                    const date = item.dt_txt.split(' ')[0];

                    if (!dailyWeatherData[date]) {
                        dailyWeatherData[date] = [];

                    }

                    dailyWeatherData[date].push(item);

                    //Picks the midday forecast closest to 12:00 and adds it to a list.
                    const dailyWeather = Object.entries(dailyWeatherData).map(([date, entries]) => {
                        const noonForecast = entries.reduce((noon, item) => {
                            const hour = Number(noon.dt_txt.split(' ')[1].slice(0, 2));

                            const closestHour = Number(noon.dt_txt.split(' ')[1].slice(0, 2));

                            return Math.abs(hour - 12) < Math.abs(closestHour - 12) ? item : noon;
                        })

                        return { date, ...noonForecast };
                    })
                        .slice(0, 5)
                    setWeatherData(dailyWeather);
                })

            } catch (error) {
                setError(error.message);
            } finally {
                toggleLoading(false);
            }
        }
        loadWeatherData();
    }, [])
    if (loading) {
        return <section className="weather-widget">Loading forecast...</section>;
    }

    if (error) {
        return <section className="weather-widget">{error}</section>;
    }

    return (
        <section className="weather-widget">
            <h2>5 Days Forecast:</h2>

            <div className="weather-forecast">
                {weatherData.map((day) => {
                    const date = new Date(`${day.date}T12:00:00`)

                    const formattedDate = date.toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                    });

                    const icon = day.weather[0].icon;

                    return (
                        <div className="weather-row" key={day.date}>
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                alt={day.weather[0].description}
                                className="weather-icon"
                            />

                            <span className="weather-temperature">{Math.round(day.main.temp)}°C</span>
                            <span className="weather-date">{formattedDate}</span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
export default WeatherWidget;