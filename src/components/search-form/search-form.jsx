import React from "react"

import {
	SearchFormContainer,
	LocationButton,
	StyledInput,
	StyledLabel,
	StyledInputContainer,
} from "./search-form.styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faLocationArrow } from "@fortawesome/free-solid-svg-icons"

const SearchForm = ({
	getCityWeatherData,
	handleLocationWeatherData,
	query,
	setLastQuery,
	setQuery,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault()
		getCityWeatherData(query)
		setLastQuery(query)
		setQuery("")
	}

	return (
		<SearchFormContainer onSubmit={handleSubmit}>
			{localStorage.hasOwnProperty("weatherData") ? (
				<></>
			) : (
				<LocationButton
					onClick={handleLocationWeatherData}
					type="button"
					title="Use my Location"
					aria-label="Use my location"
				>
					<FontAwesomeIcon icon={faLocationArrow} />
				</LocationButton>
			)}
			<StyledInputContainer>
				<StyledInput
					type="text"
					name="city"
					onChange={(e) => setQuery(e.target.value)}
					required
				/>
				<StyledLabel htmlFor="city" className={query.length ? "shrink" : ""}>
					Enter city name
				</StyledLabel>
			</StyledInputContainer>
			<button type="submit" title="Search" aria-label="Search">
				<FontAwesomeIcon icon={faSearch} />
			</button>
		</SearchFormContainer>
	)
}

export default SearchForm
