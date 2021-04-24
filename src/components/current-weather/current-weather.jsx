import React from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBinoculars,
	faMapMarkerAlt,
	faClock,
	faCloud,
	faLongArrowAltDown,
	faMoon,
	faSun,
	faSyncAlt,
	faTemperatureLow,
	faTemperatureHigh,
	faThermometerHalf,
	faTint,
	faUmbrella,
	faWind,
} from "@fortawesome/free-solid-svg-icons"

const StyledContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto auto 1fr 1fr 1fr;

	padding: 16px;
	margin: 8px;

	border-radius: 4px;
	box-shadow: var(--border-shadow);

	transition: 0.2s ease;

	&:hover {
		box-shadow: var(--mid-shadow);
	}

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto 1fr 1fr;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto 1fr 1fr;
	}
`

const StyledTopRow = styled.div`
	display: flex;
	justify-content: space-between;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-column: span 2;
	}
`

const TopRowFlexContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const LocationName = styled.span`
	margin: 0 0 0 4px;
`

const StyledRefreshButton = styled.div`
	height: fit-content;

	margin: 0 0 0 8px;
	padding: 0;

	border: none;
	background: none;
	color: var(--text);
	font-size: 1em;

	cursor: pointer;
	pointer-events: initial;
	transition: 1s ease-in-out;

	opacity: ${(props) => (props.disabled ? "0.1" : "1")};
	pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
	transform: ${(props) => (props.disabled ? "rotate(360deg)" : "rotate(0deg)")};
`

const StyledH3 = styled.h3`
	margin: 0 0 16px 0;
	justify-self: center;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-column: 1/3;
	}
`

const StyledConditions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-column: span 2;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		grid-column: span 2;
	}
`

const StyledTemp = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 6rem;
	font-weight: 700;
`

const StyledInfoCol = styled.div`
	justify-self: stretch;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	// Medium devices (tablets, 768px and up)
	@media (min-width: 768px) {
		min-width: 256px;
	}
`

const CurrentWeather = ({
	convertTime,
	daysArray,
	forceRefetch,
	forceRefresh,
	iconURL,
	weatherData,
}) => {
	let popSum = 0
	let minTempArray = []
	let maxTempArray = []
	let direction = ""

	for (let i = 0; i < daysArray[0].length; i++) {
		popSum += daysArray[0][i].pop
		minTempArray.push(daysArray[0][i].main.temp_min)
		maxTempArray.push(daysArray[0][i].main.temp_max)
	}

	if (weatherData.wind.deg < 22.5 && weatherData.wind.deg > 337.5) {
		direction = "N"
	} else if (weatherData.wind.deg < 67.5 && weatherData.wind.deg > 22.5) {
		direction = "NE"
	} else if (weatherData.wind.deg < 112.5 && weatherData.wind.deg > 67.5) {
		direction = "E"
	} else if (weatherData.wind.deg < 157.5 && weatherData.wind.deg > 112.5) {
		direction = "SE"
	} else if (weatherData.wind.deg < 202.5 && weatherData.wind.deg > 157.5) {
		direction = "S"
	} else if (weatherData.wind.deg < 247.5 && weatherData.wind.deg > 202.5) {
		direction = "SW"
	} else if (weatherData.wind.deg < 292.5 && weatherData.wind.deg > 247.5) {
		direction = "W"
	} else if (weatherData.wind.deg < 337.5 && weatherData.wind.deg > 292.5) {
		direction = "NW"
	}

	let item = {
		clouds: weatherData.clouds.all,
		date: weatherData.dt,
		description: weatherData.weather[0].description,
		feelsLike: Math.round(weatherData.main.feels_like),
		humidity: weatherData.main.humidity,
		image: weatherData.weather[0].icon,
		imageCode: weatherData.weather[0].id,
		lastUpdated: weatherData.dt,
		pop: Math.round((popSum / daysArray[0].length) * 100),
		pressure: weatherData.main.pressure,
		main: weatherData.weather[0].main,
		sunrise: weatherData.sys.sunrise,
		sunset: weatherData.sys.sunset,
		temp: Math.round(weatherData.main.temp),
		tempMin: Math.round(Math.min(...minTempArray)),
		tempMax: Math.round(Math.max(...maxTempArray)),
		visibility: Math.floor(weatherData.visibility / 1000),
		windSpeed: weatherData.wind.speed,
		windDeg: weatherData.wind.deg,
		windDir: direction,
	}

	return (
		<StyledContainer>
			<StyledH3>Current weather</StyledH3>
			<StyledTopRow>
				<TopRowFlexContainer>
					<FontAwesomeIcon
						icon={faMapMarkerAlt}
						title="Current location"
						aria-label="Current location"
					/>
					<LocationName>
						{weatherData.name}, {weatherData.sys.country}
					</LocationName>
				</TopRowFlexContainer>
				<TopRowFlexContainer
					title={forceRefetch ? "Next refresh in 5 min" : ""}
					aria-label={forceRefetch ? "Next refresh in 5 min" : ""}
				>
					<div>
						<FontAwesomeIcon
							icon={faClock}
							title="Last updated"
							aria-label="Last updated"
						/>{" "}
						{convertTime(weatherData.dt)}
					</div>
					<StyledRefreshButton
						onClick={forceRefresh}
						disabled={forceRefetch ? true : false}
						title="Refresh"
						aria-label="Refresh"
					>
						<FontAwesomeIcon icon={faSyncAlt} />
					</StyledRefreshButton>
				</TopRowFlexContainer>
			</StyledTopRow>
			<StyledConditions>
				<img src={`${iconURL}/${item.image}@2x.png`} alt={item.description} />
				<StyledTemp>
					<div>{item.temp}°</div>
				</StyledTemp>
			</StyledConditions>
			<StyledInfoCol>
				<div>
					<FontAwesomeIcon
						icon={faTemperatureLow}
						title="Minimum Temperature"
						aria-label="Minimum Temperature"
					/>{" "}
					{item.tempMin}°{" "}
					<FontAwesomeIcon
						icon={faTemperatureHigh}
						title="Max Temperature"
						aria-label="Max Temperature"
					/>{" "}
					{item.tempMax}°
				</div>
				<div>
					<FontAwesomeIcon
						icon={faThermometerHalf}
						aria-hidden="true"
						title="Feels like"
						aria-label="Feels like"
					/>{" "}
					Feels like {item.feelsLike}°
				</div>
				<div>
					<FontAwesomeIcon
						icon={faCloud}
						aria-hidden="true"
						title="Cloud coverage"
						aria-label="Cloud coverage"
					/>{" "}
					Cloud coverage: {item.clouds}%
				</div>
				<div>
					<FontAwesomeIcon
						icon={faUmbrella}
						aria-hidden="true"
						title="Probability of precipitation"
						aria-label="Probability of precipitation"
					/>{" "}
					Precipitation: {item.pop}%
				</div>
				<div>
					<FontAwesomeIcon
						icon={faTint}
						aria-hidden="true"
						title="Humidity"
						aria-label="Humidity"
					/>{" "}
					Humidity: {item.humidity}%
				</div>
			</StyledInfoCol>
			<StyledInfoCol>
				<div>
					<FontAwesomeIcon
						icon={faLongArrowAltDown}
						aria-hidden="true"
						title="Atmospheric pressure"
						aria-label="Atmospheric pressure"
					/>{" "}
					Pressure: {item.pressure}hPa
				</div>
				<div>
					<FontAwesomeIcon
						icon={faBinoculars}
						aria-hidden="true"
						title="Visibility"
						aria-label="Visibility"
					/>{" "}
					Visibility: {item.visibility}km
				</div>
				<div>
					<FontAwesomeIcon
						icon={faWind}
						aria-hidden="true"
						title="Wind speed/direction"
						aria-label="Wind speed/direction"
					/>{" "}
					Wind: {item.windSpeed}
					m/s{" "}
					<FontAwesomeIcon
						icon={faLongArrowAltDown}
						transform={{ rotate: item.windDeg }}
						aria-hidden="true"
						title="Direction"
						aria-label="Direction"
					/>{" "}
					{item.windDeg}° ({item.windDir})
				</div>
				<div>
					<FontAwesomeIcon icon={faSun} title="Sunrise" aria-label="Sunrise" />{" "}
					Sunrise: {convertTime(item.sunrise)}
				</div>
				<div>
					<FontAwesomeIcon icon={faMoon} title="Sunset" aria-label="Sunset" />{" "}
					Sunset: {convertTime(item.sunset)}
				</div>
			</StyledInfoCol>
		</StyledContainer>
	)
}

export default CurrentWeather
