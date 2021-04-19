import React, { useEffect, useState } from "react"
import axios from "axios"

import { GlobalStyle, StyledContainer } from "./App.styles"

import WeatherCard from "./components/weather-card/weather-card.jsx"
import SearchForm from "./components/search-form/search-form"
import SpinningLogo from "./components/spinning-logo/spinning-logo"

function App() {
	const [query, setQuery] = useState("")
	const [weatherData, setWeatherData] = useState([])
	const [forecastData, setForecastData] = useState([])
	const [forceRefetch, setForceRefetch] = useState(false)

	const API_URL = process.env.REACT_APP_WEATHER_API_URL
	const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

	// Format to hh:mm
	const convertTime = (time) => {
		const timeOptions = {
			hour12: false,
			hour: "numeric",
			minute: "numeric",
		}
		return new Date(time * 1000).toLocaleTimeString("en-GB", timeOptions)
	}

	// Format to wd, dd/mm/yyyy
	const convertDate = (time) => {
		const timeOptions = {
			weekday: "short",
			day: "numeric",
			month: "numeric",
			year: "numeric",
		}
		return new Date(time * 1000).toLocaleDateString("en-GB", timeOptions)
	}

	// Force data refetch
	const forceRefresh = () => {
		handleLocationWeatherData()
		setForceRefetch(true)
		setTimeout(() => {
			setForceRefetch(false)
			clearTimeout()
		}, 300000)
	}

	// Fetch weather data by query
	const getCityWeatherData = () => {
		axios
			.all([
				axios.get(
					`${API_URL}/weather/?q=${query}&units=metric&appid=${API_KEY}`
				),
				axios.get(
					`${API_URL}/forecast?q=${query}&units=metric&appid=${API_KEY}`
				),
			])
			.then(
				axios.spread((...responses) => {
					setWeatherData(responses[0].data)
					setForecastData(responses[1].data)
				})
			)
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 404) {
						alert(
							"City not found. Please enter valid city name and/or two letter country code separated by coma. (e.g. Plovdiv, BG)"
						)
					}
					console.log(error.response.data.message)
				} else {
					console.log(error)
				}
			})
	}

	// Fetch weather data by location
	const getLocationWeatherData = (lat, lon) => {
		axios
			.all([
				axios.get(
					`${API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
				),
				axios.get(
					`${API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
				),
			])
			.then(
				axios.spread((...responses) => {
					setWeatherData(responses[0].data)
					setForecastData(responses[1].data)
					localStorage.setItem("weatherData", JSON.stringify(responses[0].data))
					localStorage.setItem(
						"forecastData",
						JSON.stringify(responses[1].data)
					)
				})
			)
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data.message)
				} else {
					console.log(error)
				}
			})
	}

	// Get location
	const getLocation = (options) => {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, options)
		})
	}

	const handleLocationWeatherData = () => {
		getLocation()
			.then((position) => {
				getLocationWeatherData(
					position.coords.latitude,
					position.coords.longitude
				)
			})
			.catch((error) => {
				if (error.code === 1) {
					alert(
						"To use your geolocation please allow location permission on your device."
					)
				} else if (error.code === 2) {
					alert(
						"Geolocation failed because one or several internal sources of position returned an internal error."
					)
				} else if (error.code === 3) {
					alert("Geolocation timed out.")
				}
				console.log(error.message)
			})
	}

	useEffect(() => {
		if (
			localStorage.hasOwnProperty("weatherData") ||
			localStorage.hasOwnProperty("forecastData")
		) {
			// local storage data found
			if (
				Date.now() - JSON.parse(localStorage.getItem("weatherData")).dt * 1000 >
				1000 * 60 * 60 * 1
			) {
				// data is stale and will be updated
				handleLocationWeatherData()
			} else {
				// data is up to date and can be set to state
				setWeatherData(JSON.parse(localStorage.getItem("weatherData")))
				setForecastData(JSON.parse(localStorage.getItem("forecastData")))
			}
		}

		// eslint-disable-next-line
	}, [])

	return (
		<>
			<GlobalStyle />
			{weatherData.cod === 200 && forecastData.cod === "200" ? (
				<StyledContainer>
					<WeatherCard
						convertDate={convertDate}
						convertTime={convertTime}
						forceRefetch={forceRefetch}
						forceRefresh={forceRefresh}
						forecastData={forecastData}
						handleLocationWeatherData={handleLocationWeatherData}
						getCityWeatherData={getCityWeatherData}
						query={query}
						setQuery={setQuery}
						weatherData={weatherData}
					/>
				</StyledContainer>
			) : (
				<StyledContainer>
					<SearchForm
						handleLocationWeatherData={handleLocationWeatherData}
						getCityWeatherData={getCityWeatherData}
						query={query}
						setQuery={setQuery}
					/>
					<SpinningLogo />
				</StyledContainer>
			)}
		</>
	)
}

export default App
