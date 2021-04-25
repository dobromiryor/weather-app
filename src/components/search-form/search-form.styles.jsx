import styled, { css } from "styled-components"

const shrinkLabelStyles = css`
	font-size: 0.7em;
	transform: translateX(1px) translateY(-13px);
`

export const SearchFormContainer = styled.form`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-self: flex-start;

	margin: 8px;
	padding: 16px;

	box-shadow: var(--border-shadow);
	border-radius: 4px;

	transition: 0.2s ease;

	&:hover {
		box-shadow: var(--mid-shadow);
	}

	&:focus-within {
		box-shadow: var(--small-shadow);
	}

	button {
		height: fit-content;

		margin: 0;
		padding: 0;

		border: none;
		background: none;
		color: var(--text);
		font-size: 1em;

		cursor: pointer;

		&:focus {
			outline: none;
		}
	}
`

export const LocationButton = styled.button`
	width: 18px;
`

export const StyledInputContainer = styled.div`
	position: relative;
	width: 100%;
`

export const StyledLabel = styled.label`
	position: absolute;
	top: 0px;
	left: 7px;

	pointer-events: none;

	transition: all 0.2s ease;

	&.shrink {
		${shrinkLabelStyles}
	}
`

export const StyledInput = styled.input`
	box-sizing: border-box;

	margin: 0 4px;
	padding: 4px;

	width: calc(100% - 2 * 4px);
	height: 22px;

	border: none;
	border-top: 1px solid var(--background);
	border-bottom: 1px solid var(--background);

	background-color: var(--background);
	color: var(--text);

	font-size: 1em;

	&:hover,
	&:focus {
		outline: none;
		border-top: 1px solid var(--background);
		border-bottom: 1px solid var(--text);
	}

	&:focus ~ ${StyledLabel} {
		${shrinkLabelStyles}
	}
`
