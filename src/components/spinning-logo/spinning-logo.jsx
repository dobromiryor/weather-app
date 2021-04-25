import React from "react"
import styled from "styled-components"

import { ReactComponent as Logo } from "./logo.svg"

const ScalingContainer = styled.div`
	animation: scale 2s infinite alternate ease-in-out;
	margin: auto 0;

	@keyframes scale {
		0% {
			transform: scale(0.7);
		}
		100% {
			transform: scale(0.5);
		}
	}
`

const StyledLogo = styled(Logo)`
	align-self: center;
	justify-self: center;

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
			<StyledLogo title="Spinning Logo" />
		</ScalingContainer>
	)
}

export default SpinningLogo
