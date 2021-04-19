import React from "react"

import {
	SearchFormContainer,
	LocationButton,
	StyledInput,
	StyledLabel,
	StyledInputContainer,
} from "./search-form.styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

const SearchForm = ({
	getCityWeatherData,
	handleLocationWeatherData,
	query,
	setQuery,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault()
		getCityWeatherData(query)
		setQuery("")
		document.getElementsByName("city")[0].value = ""
	}

	return (
		<SearchFormContainer onSubmit={handleSubmit}>
			{localStorage.hasOwnProperty("weatherData") ? (
				<></>
			) : (
				<LocationButton onClick={handleLocationWeatherData} type="button">
					<FontAwesomeIcon icon={faMapMarkerAlt} title="My Location" />
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
					Search city
				</StyledLabel>
			</StyledInputContainer>
			<button type="submit">
				<FontAwesomeIcon icon={faSearch} title="Search" />
			</button>
		</SearchFormContainer>
	)
}

export default SearchForm
