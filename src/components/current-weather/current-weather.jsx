import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBinoculars,
	faMapMarkerAlt,
	faClock,
	faCloud,
	faLongArrowAltDown,
	faLongArrowAltUp,
	faSun,
	faSyncAlt,
	faTemperatureLow,
	faTemperatureHigh,
	faThermometerHalf,
	faTint,
	faUmbrella,
	faWind,
} from "@fortawesome/free-solid-svg-icons"

import {
	StyledContainer,
	StyledTopRow,
	TopRowFlexContainer,
	LocationName,
	StyledRefreshButton,
	StyledH3,
	StyledConditions,
	StyledTemp,
	StyledInfoCol,
} from "./current-weather.styles"

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
					<span>{item.tempMin}° </span>
					<FontAwesomeIcon
						icon={faTemperatureHigh}
						title="Max Temperature"
						aria-label="Max Temperature"
					/>{" "}
					<span>{item.tempMax}°</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faThermometerHalf}
						aria-hidden="true"
						title="Feels like"
						aria-label="Feels like"
					/>{" "}
					<span>Feels like {item.feelsLike}°</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faCloud}
						aria-hidden="true"
						title="Cloud coverage"
						aria-label="Cloud coverage"
					/>{" "}
					<span>Cloud coverage: </span>
					<span>{item.clouds}%</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faUmbrella}
						aria-hidden="true"
						title="Probability of precipitation"
						aria-label="Probability of precipitation"
					/>{" "}
					<span>Precipitation: </span>
					<span>{item.pop}%</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faTint}
						aria-hidden="true"
						title="Humidity"
						aria-label="Humidity"
					/>{" "}
					<span>Humidity: </span>
					<span>{item.humidity}%</span>
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
					<span>Pressure: </span>
					<span>{item.pressure} hPa</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faBinoculars}
						aria-hidden="true"
						title="Visibility"
						aria-label="Visibility"
					/>{" "}
					<span>Visibility: </span>
					<span>{item.visibility} km</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faWind}
						aria-hidden="true"
						title="Wind speed/direction"
						aria-label="Wind speed/direction"
					/>{" "}
					<span>Wind: </span>
					<span>{item.windSpeed} m/s</span>{" "}
					<FontAwesomeIcon
						icon={faLongArrowAltDown}
						transform={{ rotate: item.windDeg }}
						aria-hidden="true"
						title="Direction"
						aria-label="Direction"
					/>{" "}
					<span>{item.windDeg}° </span>
					<span>({item.windDir})</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faSun}
						aria-hidden="true"
						title="Sunrise"
						aria-label="Sunrise"
					/>
					<FontAwesomeIcon
						icon={faLongArrowAltUp}
						aria-hidden="true"
						title="Sunrise"
						aria-label="Sunrise"
					/>{" "}
					<span>Sunrise: </span>
					<span>{convertTime(item.sunrise)}</span>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faSun}
						aria-hidden="true"
						title="Sunset"
						aria-label="Sunset"
					/>
					<FontAwesomeIcon
						icon={faLongArrowAltDown}
						aria-hidden="true"
						title="Sunset"
						aria-label="Sunset"
					/>{" "}
					<span>Sunset: </span>
					<span>{convertTime(item.sunset)}</span>
				</div>
			</StyledInfoCol>
		</StyledContainer>
	)
}

export default CurrentWeather
