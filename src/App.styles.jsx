import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html {
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 100%;

    background-color: var(--background);
    color: var(--text);

    font-size: 1em;

    :root{
      --border-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
		0px 0px 0px 1px rgba(0, 0, 0, 0.15);
      --small-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15),
			0px 2px 4px -2px rgba(0, 0, 0, 0.4);
      --mid-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15),
			0px 4px 8px -4px rgba(0, 0, 0, 0.5);
      --big-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.15),
			0px 8px 16px -8px rgba(0, 0, 0, 0.6);
    }

    // Light theme
    @media (prefers-color-scheme: light) {
      :root {
        --text: #333;
        --background: #fff;
      }
    }
    // Dark theme
    @media (prefers-color-scheme: dark) {
      :root{
        --text: #ccc;
        --background: #222;
      }

      background-color: var(--background);
      color: var(--text);
    }
  }

  body {
    width: 100%;

    margin: 0;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
      width: initial;
    }
  }

  #root{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const StyledContainer = styled.div`
	box-sizing: border-box;
	margin: 0px;
	padding: 8px;

	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 100vh;

	border-radius: 8px;
	box-shadow: var(--big-shadow);

	transition: 0.2s ease;

	&.loaded {
		height: initial;
		max-height: initial;
	}

	// Small devices (landscape phones, 576px and up)
	@media (min-width: 576px) {
		margin: 32px;
		height: calc(100vh - 2 * 32px);
		max-height: 980px;
	}

	// Medium devices (tablets, 768px and up)
	@media (min-width: 768px) {
		min-width: 576px;
		max-width: 768px;
	}

	// Large devices (desktops, 992px and up)
	@media (min-width: 992px) {
		width: 768px;
	}
`
