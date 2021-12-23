import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from "react95/dist/themes/original";
import Home from './Home';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

const App = () => (
    <div>
        <GlobalStyles />
        <ThemeProvider theme={original}>
            <Home />
        </ThemeProvider>
    </div>
);
function render() {
    ReactDOM.render(<App />, document.getElementById("root"));
}

render();