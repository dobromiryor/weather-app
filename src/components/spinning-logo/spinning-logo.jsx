import React from "react"
import styled from "styled-components"

import { ReactComponent as Logo } from "./logo.svg"

const StyledLogo = styled(Logo)`
	max-width: 512px;

	align-self: center;
	justify-self: center;

	animation: rotation 3s infinite ease-in-out;
	animation-direction: alternate;

	@keyframes rotation {
		from {
			transform: rotate(0deg) scale(0.7);
		}
		to {
			transform: rotate(180deg) scale(0.6);
		}
	}

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		max-width: 702px;
	}
`

const SpinningLogo = () => {
	return <StyledLogo title="Spinning Logo" />
}

export default SpinningLogo
