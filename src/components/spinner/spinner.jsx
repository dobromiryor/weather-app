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

	margin: 32px;

	stroke: #ccc;

	animation: spin 1s linear infinite;

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
`

const StyledError = styled.div`
	text-align: center;

	span {
		text-decoration: underline;
		cursor: pointer;
	}
`

const Spinner = ({ error }) => {
	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<StyledWrapper>
			<StyledImg src={spinner} alt="" />
			{error ? (
				<StyledError>
					<div>{error}</div>
					<div>
						You may need to <span onClick={reloadPage}>refresh</span> this page.
					</div>
				</StyledError>
			) : (
				<></>
			)}
		</StyledWrapper>
	)
}

export default Spinner
