import styled from "styled-components"

export const StyledContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto auto 1fr auto auto;
	grid-gap: 8px;

	padding: 16px;
	margin: 8px;

	border-radius: 4px;
	box-shadow: var(--border-shadow);

	transition: 0.2s ease;

	&:hover {
		box-shadow: var(--mid-shadow);
	}

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto 1fr 1fr;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto 1fr 1fr;
	}
`

export const StyledTopRow = styled.div`
	display: flex;
	justify-content: space-between;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-column: span 2;
	}
`

export const TopRowFlexContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

export const LocationName = styled.span`
	margin: 0 0 0 4px;
`

export const StyledRefreshButton = styled.div`
	height: fit-content;

	margin: 0 0 0 8px;
	padding: 0;

	border: none;
	background: none;
	color: var(--text);
	font-size: 1em;

	cursor: pointer;
	pointer-events: initial;
	transition: 1s ease-in-out;

	opacity: ${(props) => (props.disabled ? "0.1" : "1")};
	pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
	transform: ${(props) => (props.disabled ? "rotate(360deg)" : "rotate(0deg)")};
`

export const StyledH3 = styled.h3`
	margin: 0 0 16px 0;
	justify-self: center;

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-column: 1/3;
	}
`

export const StyledConditions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	// under 310px
	@media (max-width: 310px) {
		flex-direction: column;
	}

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		grid-column: span 2;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		grid-column: span 2;
	}
`

export const StyledTemp = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 6rem;
	font-weight: 700;
`

export const StyledInfoCol = styled.div`
	justify-self: stretch;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	// Medium devices (tablets, 768px and up)
	@media (min-width: 768px) {
		min-width: 256px;
	}
`
