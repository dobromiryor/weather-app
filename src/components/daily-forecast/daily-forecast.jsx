import React from "react"
import styled from "styled-components"

import ItemCard from "../item-card/item-card.jsx"

const DailyContainer = styled.section`
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

const DailyList = styled.div`
	overflow: scroll auto;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: initial;
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
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: initial;
	}
`

const DailyForecast = ({ daysArray, convertDate, iconURL }) => {
	let dailyArray = []
	for (let i = 1; i < 5; i++) {
		let cloudsSum = 0
		let popSum = 0
		let tempSum = 0
		let mid = Math.ceil(daysArray[i].length / 2)
		for (let j = 0; j < daysArray[i].length; j++) {
			if (!daysArray[i][j].dt) {
				window.location.reload()
			}
			cloudsSum += daysArray[i][j].clouds.all
			popSum += daysArray[i][j].pop
			tempSum += daysArray[i][j].main.temp
		}

		let result = {
			clouds: Math.round(cloudsSum / daysArray[i].length),
			date: daysArray[i][mid].dt,
			description: daysArray[i][mid].weather[0].description,
			image:
				daysArray[i][mid].weather[0].icon.substring(
					0,
					daysArray[i][mid].weather[0].icon.length - 1
				) + "d",
			pop: Math.round((popSum / daysArray[i].length) * 100),
			main: daysArray[i][mid].weather[0].main,
			temp: Math.round(tempSum / daysArray[i].length),
		}

		dailyArray.push(result)
	}

	return (
		<DailyContainer>
			<StyledH3>Next 4 days</StyledH3>
			<DailyList>
				{dailyArray.slice(0, 4).map((item, index) => (
					<ItemCard
						key={index}
						timeOrDate={convertDate}
						item={item}
						iconURL={iconURL}
					/>
				))}
			</DailyList>
		</DailyContainer>
	)
}

export default DailyForecast
