import React from "react"
import styled from "styled-components"

import { ReactComponent as Logo } from "./logo.svg"

const ScalingContainer = styled.div`
	display: flex;
	justify-content: center;

	height: 100%;
	margin: auto 0;
	animation: scale 2s infinite alternate ease-in-out;

	@keyframes scale {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0.9);
		}
	}
`

const StyledLogo = styled(Logo)`
	align-self: center;
	justify-self: center;

	height: 256px;
	width: 256px;

	animation: rotate 4s infinite alternate ease-in-out;

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(180deg);
		}
	}

	& .fill {
		animation: fade 2s alternate infinite ease-in-out;

		@keyframes fade {
			0% {
				fill: #ffcc33;
			}
			100% {
				fill: #fc9601;
			}
		}
	}
`

const SpinningLogo = () => {
	return (
		<ScalingContainer>
			<StyledLogo title="" aria-hidden="true" />
		</ScalingContainer>
	)
}

export default SpinningLogo
