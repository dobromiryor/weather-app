import React from "react"
import styled from "styled-components"

import ItemCard from "../item-card/item-card.jsx"

const StyledDiv = styled.div`
	display: grid;
	grid-template-columns: initial;
	grid-template-rows: repeat(4, 1fr);

	margin: 0;
	padding: 0;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(2, 1fr);
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: initial;
	}
`

const DailyForecast = ({ daysArray, convertDate, iconURL }) => {
	let dailyArray = []

	for (let i = 1; i < 6; i++) {
		let cloudsSum = 0
		let popSum = 0
		let tempSum = 0
		for (let j = 0; j < daysArray[i].length; j++) {
			cloudsSum += daysArray[i][j].clouds.all
			popSum += daysArray[i][j].pop
			tempSum += daysArray[i][j].main.temp
		}

		let result = {
			clouds: Math.round(cloudsSum / daysArray[i].length),
			date: daysArray[i][0].dt,
			description: daysArray[i][0].weather[0].description,
			image:
				daysArray[i][0].weather[0].icon.substring(
					0,
					daysArray[i][0].weather[0].icon.length - 1
				) + "d",
			pop: Math.round((popSum / daysArray[i].length) * 100),
			main: daysArray[i][0].weather[0].main,
			temp: Math.round(tempSum / daysArray[i].length),
		}

		dailyArray.push(result)
	}

	return (
		<StyledDiv>
			{dailyArray.slice(0, 4).map((item, index) => (
				<ItemCard
					key={index}
					timeOrDate={convertDate}
					item={item}
					iconURL={iconURL}
				/>
			))}
		</StyledDiv>
	)
}

export default DailyForecast
