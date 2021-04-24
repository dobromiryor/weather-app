import React from "react"
import styled from "styled-components"

import ItemCard from "../item-card/item-card.jsx"

const HourlyContainer = styled.section`
	display: flex;
	flex-direction: column;

	padding: 16px;
	margin: 8px;

	border-radius: 4px;
	box-shadow: var(--border-shadow);

	transition: 0.2s ease;

	&:hover {
		box-shadow: var(--mid-shadow);
	}
`

const StyledH3 = styled.h3`
	align-self: center;
	margin: 0 0 16px 0;
`

const HourlyList = styled.div`
	overflow: scroll auto;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 16px;

	margin: -8px;
	padding: 8px;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		overflow: initial;
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
		<HourlyContainer>
			<StyledH3>Next 24 hours</StyledH3>
			<HourlyList>
				{hourlyArray.slice(0, 4).map((item, index) => (
					<ItemCard
						key={index}
						timeOrDate={convertTime}
						item={item}
						iconURL={iconURL}
					/>
				))}
			</HourlyList>
		</HourlyContainer>
	)
}

export default HourlyForecast
