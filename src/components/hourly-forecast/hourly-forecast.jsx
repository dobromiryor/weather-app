import React from "react"
import styled from "styled-components"

import ItemCard from "../item-card/item-card.jsx"

const StyledDiv = styled.div`
	display: grid;
	grid-template-rows: repeat(4, 1fr);
	grid-template-columns: initial;

	margin: 0;
	padding: 0;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(2, 1fr);
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		grid-template-rows: initial;
		grid-template-columns: repeat(4, 1fr);
	}
`

const HourlyForecast = ({ convertTime, forecastData, iconURL }) => {
	let hourlyArray = []

	for (let i = 0; i < 5; i++) {
		let result = {
			clouds: forecastData.list[i].clouds.all,
			date: forecastData.list[i].dt,
			description: forecastData.list[i].weather[0].description,
			image: forecastData.list[i].weather[0].icon,
			pop: Math.round(forecastData.list[i].pop * 100),
			main: forecastData.list[i].weather[0].main,
			temp: Math.round(forecastData.list[i].main.temp),
		}
		hourlyArray.push(result)
	}

	return (
		<StyledDiv>
			{hourlyArray.slice(0, 4).map((item, index) => (
				<ItemCard
					key={index}
					timeOrDate={convertTime}
					item={item}
					iconURL={iconURL}
				/>
			))}
		</StyledDiv>
	)
}

export default HourlyForecast
