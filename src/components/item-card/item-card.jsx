import React from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloud, faCloudRain } from "@fortawesome/free-solid-svg-icons"

const StyledCard = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;

	border-radius: 4px;
	box-shadow: var(--border-shadow);

	margin: 0px;
	padding: 8px;

	transition: 0.2s ease;

	img {
		max-width: 100px;
		height: auto;
	}

	&:hover {
		box-shadow: var(--small-shadow);
	}
	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		margin: 0;
	}
`

const Row = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	div {
		margin: 2px;
	}

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		flex-direction: row;
	}
`

const ItemCard = ({ iconURL, item, timeOrDate }) => {
	return (
		<StyledCard>
			<div>{timeOrDate(item.date)}</div>
			<img src={`${iconURL}/${item.image}@2x.png`} alt={item.description} />
			<div>
				{Math.round(item.temp)}° – {item.main}
			</div>
			<Row>
				{item.clouds > 10 ? (
					<div>
						<FontAwesomeIcon
							icon={faCloud}
							title="Cloud coverage"
							aria-label="Cloud coverage"
						/>{" "}
						{item.clouds}%
					</div>
				) : (
					<></>
				)}
				{item.pop > 0 ? (
					<div>
						<FontAwesomeIcon
							icon={faCloudRain}
							aria-label="Probability of precipitation"
							title="Probability of precipitation"
						/>{" "}
						{item.pop}%
					</div>
				) : (
					<></>
				)}
			</Row>
		</StyledCard>
	)
}

export default ItemCard
