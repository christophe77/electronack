import React, { FC } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import TopBar from "./TopBar";
import useSocket from "./useSocket";
import BotPanel from "./BotPanel";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

const App: FC = () => {
  const { bots, broadcast, startListening, stopListening, serverStatus } =
    useSocket();
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <TopBar
          startListening={startListening}
          stopListening={stopListening}
          serverStatus={serverStatus}
        />
        <BotPanel bots={bots} broadcast={broadcast} />
      </ThemeProvider>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
