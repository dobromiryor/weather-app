import React, { useEffect, useState } from "react"
import "./App.css"
import styled, { createGlobalStyle } from "styled-components"

import Spinner from "./components/spinner/spinner.jsx"
import WeatherCard from "./components/weather-card/weather-card.jsx"

const GlobalStyle = createGlobalStyle`
  html {
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 100%;

    background-color: var(--background);
    color: var(--text);

    :root{
      --border-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
		0px 0px 0px 1px rgba(0, 0, 0, 0.15);
      --small-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15),
			0px 4px 8px -4px rgba(0, 0, 0, 0.5);
      --big-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.15),
			0px 8px 24px -8px rgba(0, 0, 0, 0.5);
    }

    // Light theme
    @media (prefers-color-scheme: light) {
      :root {
        --text: #333;
        --background: #fff;
      }
    }
    // Dark theme
    @media (prefers-color-scheme: dark) {
      :root{
        --text: #ccc;
        --background: #222;
      }

      background-color: var(--background);
      color: var(--text);
    }
  }

  body {
    width: 100%;

    margin: 0;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
      width: unset;
    }
  }

  #root{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledContainer = styled.div`
	margin: 0px;
	padding: 8px;

	width: 100%;

	border-radius: 8px;
	box-shadow: var(--big-shadow);

	transition: 0.2s ease;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		margin: 32px;
	}

	// Medium devices (tablets, 768px and up)
	@media (min-width: 768px) {
		max-width: 768px;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		width: unset;
		max-width: 992px;
	}
`

function App() {
	const [error, setError] = useState(null)
	const [lat, setLat] = useState()
	const [latLoaded, setLatLoaded] = useState(false)
	const [lon, setLon] = useState()
	const [lonLoaded, setLonLoaded] = useState(false)
	const [weatherData, setWeatherData] = useState([])
	const [weatherLoaded, setWeatherLoaded] = useState(false)
	const [forecastData, setForecastData] = useState([])
	const [forecastLoaded, setForecastLoaded] = useState(false)
	const [forceRefetch, setForceRefetch] = useState(false)

	const API_URL = process.env.REACT_APP_WEATHER_API_URL
	const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

	// Format to 00:00
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
		setForceRefetch(true)
		console.log(`1 refresh per 5 min`)
		setTimeout(() => {
			setForceRefetch(false)
			console.log(`refresh timer finished`)
			clearTimeout()
		}, 300000)
	}

	// Get weather data
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			// Get latitude
			setLat(position.coords.latitude)
			setLatLoaded(true)
			// Get longitude
			setLon(position.coords.longitude)
			setLonLoaded(true)
		})
	})

	useEffect(() => {
		const fetchWeatherData = () => {
			fetch(
				`${API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
			)
				.then((res) => res.json())
				.then((result) => {
					if (result.cod !== 200) {
						setError(result.message)
					} else {
						setWeatherData(result)
						localStorage.setItem("weatherData", JSON.stringify(result))
						console.log("weather", result)
					}
					console.log(`current weather API called once!`)
				})
		}
		const fetchForecastData = () => {
			fetch(
				`${API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
			)
				.then((res) => res.json())
				.then((result) => {
					if (result.cod !== "200") {
						setError(result.message)
					} else {
						setForecastData(result)
						localStorage.setItem("forecastData", JSON.stringify(result))
						console.log("forecast", result)
					}
					console.log(`weather forecast API called once!`)
				})
		}

		if (
			localStorage.getItem("weatherData") === null ||
			localStorage.getItem("forecastData") === null
		) {
			if (latLoaded && lonLoaded) {
				console.log("lat and lon loaded, calling API")
				fetchForecastData()
				fetchWeatherData()
				setWeatherLoaded(true)
				setForecastLoaded(true)
			} else {
				console.log("need both coordinates")
			}
		} else if (forceRefetch) {
			fetchForecastData()
			fetchWeatherData()
			setWeatherLoaded(true)
			setForecastLoaded(true)
		} else {
			if (
				JSON.parse(localStorage.getItem("forecastData")).cod === "200" &&
				JSON.parse(localStorage.getItem("weatherData")).cod === 200
			) {
				if (
					Date.now() -
						JSON.parse(localStorage.getItem("weatherData")).dt * 1000 >
					1000 * 60 * 60 * 2
				) {
					if (latLoaded && lonLoaded) {
						console.log("data age > 2 hours")
						console.log("lat and lon loaded, calling API")
						fetchWeatherData()
						fetchForecastData()
						setWeatherLoaded(true)
						setForecastLoaded(true)
					} else {
						console.log("need both coordinates")
					}
				} else {
					setWeatherData(JSON.parse(localStorage.getItem("weatherData")))
					setForecastData(JSON.parse(localStorage.getItem("forecastData")))
					setWeatherLoaded(true)
					setForecastLoaded(true)
				}
			} else {
				console.log(
					"weather error",
					JSON.parse(localStorage.getItem("weatherData")).cod,
					JSON.parse(localStorage.getItem("weatherData")).message
				)
				console.log(
					"forecast error",
					JSON.parse(localStorage.getItem("forecastData")).cod,
					JSON.parse(localStorage.getItem("forecastData")).message
				)
				setError(`weather error: ${
					JSON.parse(localStorage.getItem("weatherData")).message
				}
          forecast error: ${
						JSON.parse(localStorage.getItem("forecastData")).message
					}`)
			}
		}

		console.log("effect ran once!")
	}, [
		API_KEY,
		API_URL,
		lon,
		lat,
		latLoaded,
		lonLoaded,
		weatherData.dt,
		forceRefetch,
	])

	return (
		<>
			<GlobalStyle />
			{weatherLoaded &&
			weatherData.cod === 200 &&
			forecastLoaded &&
			forecastData.cod === "200" ? (
				<StyledContainer>
					<WeatherCard
						convertDate={convertDate}
						convertTime={convertTime}
						forceRefetch={forceRefetch}
						forceRefresh={forceRefresh}
						forecastData={forecastData}
						weatherData={weatherData}
					/>
				</StyledContainer>
			) : (
				<Spinner error={error} />
			)}
		</>
	)
}

export default App
