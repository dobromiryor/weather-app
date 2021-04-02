import React from "react"
import styled from "styled-components"

import CurrentWeather from "../current-weather/current-weather.jsx"
import HourlyForecast from "../hourly-forecast/hourly-forecast.jsx"
import DailyForecast from "../daily-forecast/daily-forecast.jsx"

const StyledWrapper = styled.div``

const WeatherCard = ({
	convertDate,
	convertTime,
	forceRefetch,
	forceRefresh,
	forecastData,
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
		<StyledWrapper>
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
		</StyledWrapper>
	)
}

export default WeatherCard
