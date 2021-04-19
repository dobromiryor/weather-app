import React from "react"

import CurrentWeather from "../current-weather/current-weather.jsx"
import HourlyForecast from "../hourly-forecast/hourly-forecast.jsx"
import DailyForecast from "../daily-forecast/daily-forecast.jsx"
import SearchForm from "../search-form/search-form.jsx"

const WeatherCard = ({
	convertDate,
	convertTime,
	forceRefetch,
	forceRefresh,
	forecastData,
	handleLocationWeatherData,
	getCityWeatherData,
	query,
	setQuery,
	weatherData,
}) => {
	const ICON_URL = process.env.REACT_APP_WEATHER_ICON_URL
	let daysArray = []

	// day of the year
	const dayOfYear = (date) => {
		let timestamp = new Date().setFullYear(new Date().getFullYear(), 0, 1)
		let yearFirstDay = Math.floor(timestamp / 86400000)
		return Math.ceil(date.getTime() / 86400000) - yearFirstDay
	}

	for (let i = 0; i < 6; i++) {
		daysArray.push(
			forecastData.list.filter(
				(item) =>
					dayOfYear(new Date(item.dt * 1000)) === dayOfYear(new Date()) + i
			)
		)
	}

	return (
		<>
			<SearchForm
				handleLocationWeatherData={handleLocationWeatherData}
				getCityWeatherData={getCityWeatherData}
				query={query}
				setQuery={setQuery}
			/>
			<CurrentWeather
				convertDate={convertDate}
				convertTime={convertTime}
				daysArray={daysArray}
				forceRefetch={forceRefetch}
				forceRefresh={forceRefresh}
				iconURL={ICON_URL}
				weatherData={weatherData}
			/>
			<HourlyForecast
				convertTime={convertTime}
				forecastData={forecastData}
				iconURL={ICON_URL}
			/>
			<DailyForecast
				convertDate={convertDate}
				daysArray={daysArray}
				iconURL={ICON_URL}
			/>
		</>
	)
}

export default WeatherCard
