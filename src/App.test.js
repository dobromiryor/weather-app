import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders search city label", () => {
	render(<App />)
	const labelElement = screen.getByText(/enter city name/i)
	expect(labelElement).toBeInTheDocument()
})
