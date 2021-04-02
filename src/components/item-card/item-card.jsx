import React from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloud, faCloudRain } from "@fortawesome/free-solid-svg-icons"

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	border-radius: 4px;
	box-shadow: var(--border-shadow);

	padding: 8px;
	margin: 8px;

	transition: 0.2s ease;

	img {
		max-width: 100px;
		height: auto;
	}

	&:hover {
		box-shadow: var(--small-shadow);
	}
`

const Row = styled.div`
	display: flex;

	div {
		margin: 0 2px;
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
						<FontAwesomeIcon icon={faCloud} title="Cloud coverage" />{" "}
						{item.clouds}%
					</div>
				) : (
					<></>
				)}
				{item.pop > 0 ? (
					<div>
						<FontAwesomeIcon
							icon={faCloudRain}
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
