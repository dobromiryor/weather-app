import React from "react"
import styled from "styled-components"

import spinner from "./spinner.svg"

const StyledWrapper = styled.div`
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

const Spinner = () => {
	return (
		<StyledWrapper>
			<img src={spinner} alt="" />
		</StyledWrapper>
	)
}

export default Spinner
