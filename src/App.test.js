import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders search city label", () => {
	render(<App />)
	const labelElement = screen.getByText(/search city/i)
	expect(labelElement).toBeInTheDocument()
})
