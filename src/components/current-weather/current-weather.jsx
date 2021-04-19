import React from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowAltCircleDown,
	faBinoculars,
	faMapMarked,
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

const StyledContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr 1fr 1fr;

	padding: 8px;
	margin: 8px;

	border-radius: 4px;
	box-shadow: var(--border-shadow);

	transition: 0.2s ease;

	&:hover {
		box-shadow: var(--small-shadow);
	}

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr 1fr;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr 1fr;
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

const StyledCity = styled.span`
	margin-left: 4px;
`

const RightContainer = styled.div`
	display: flex;
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
		justify-content: center;
		align-items: initial;
		min-width: 256px;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
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

	for (let i = 0; i < daysArray[0].length; i++) {
		popSum += daysArray[0][i].pop
		minTempArray.push(daysArray[0][i].main.temp_min)
		maxTempArray.push(daysArray[0][i].main.temp_max)
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
	}

	return (
		<StyledContainer>
			<StyledTopRow>
				<div>
					<FontAwesomeIcon icon={faMapMarked} title="Location" />
					<StyledCity>
						{weatherData.name},{weatherData.sys.country}
					</StyledCity>
				</div>
				<RightContainer title={forceRefetch ? "Next refresh in 5 min" : ""}>
					<div>
						<FontAwesomeIcon icon={faClock} title="Last updated" />{" "}
						{convertTime(weatherData.dt)}
					</div>
					<StyledRefreshButton
						onClick={forceRefresh}
						disabled={forceRefetch ? true : false}
						title="Refresh"
					>
						<FontAwesomeIcon icon={faSyncAlt} />
					</StyledRefreshButton>
				</RightContainer>
			</StyledTopRow>
			<StyledConditions>
				<img src={`${iconURL}/${item.image}@2x.png`} alt={item.description} />
				<StyledTemp>
					<div>{item.temp}°</div>
				</StyledTemp>
			</StyledConditions>
			<StyledInfoCol>
				<div>
					<FontAwesomeIcon icon={faTemperatureLow} title="Low" /> {item.tempMin}
					° / <FontAwesomeIcon icon={faTemperatureHigh} title="High" />{" "}
					{item.tempMax}°
				</div>
				<div>
					<FontAwesomeIcon icon={faThermometerHalf} title="Feels like" /> Feels
					like {item.feelsLike}°
				</div>
				<div>
					<FontAwesomeIcon icon={faCloud} title="Cloud coverage" /> Cloud
					coverage: {item.clouds}%
				</div>
				<div>
					<FontAwesomeIcon
						icon={faUmbrella}
						title="Probability of precipitation"
					/>{" "}
					Precipitation: {item.pop}%
				</div>
				<div>
					<FontAwesomeIcon icon={faTint} title="Humidity" /> Humidity:{" "}
					{item.humidity}%
				</div>
			</StyledInfoCol>
			<StyledInfoCol>
				<div>
					<FontAwesomeIcon
						icon={faLongArrowAltDown}
						title="Atmospheric pressure"
					/>{" "}
					Pressure: {item.pressure}hPa
				</div>
				<div>
					<FontAwesomeIcon icon={faBinoculars} title="Visibility" /> Visibility:{" "}
					{item.visibility}km
				</div>
				<div>
					<FontAwesomeIcon icon={faWind} title="Wind speed/direction" /> Wind:{" "}
					{item.windSpeed}
					m/s{" "}
					<FontAwesomeIcon
						icon={faArrowAltCircleDown}
						transform={{ rotate: item.windDeg }}
						title="Wind direction"
					/>
				</div>
				<div>
					<FontAwesomeIcon icon={faSun} title="Sunrise" /> Sunrise:{" "}
					{convertTime(item.sunrise)}
				</div>
				<div>
					<FontAwesomeIcon icon={faMoon} title="Sunset" /> Sunset:{" "}
					{convertTime(item.sunset)}
				</div>
			</StyledInfoCol>
		</StyledContainer>
	)
}

export default CurrentWeather
