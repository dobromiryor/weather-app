import React from "react"
import styled from "styled-components"

import spinner from "./spinner.svg"

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const StyledImg = styled.img`
	width: 80px;
	height: 80px;

	stroke: #ccc;

	animation: spin 1s linear infinite;

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
`

const Spinner = ({ error }) => {
	return (
		<StyledWrapper>
			<StyledImg src={spinner} alt="" />
			{error ? <div>{error}</div> : <></>}
		</StyledWrapper>
	)
}

export default Spinner
