import React, { FC } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import TopBar from "./TopBar";
import useSocket from "./useSocket";
import BotPanel from "./BotPanel";
import SingleBot from "./SingleBot";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

const App: FC = () => {
  const {
    bots,
    selectedBot,
    broadcast,
    sendOne,
    startListening,
    stopListening,
    showSingleBot,
    setShowSingleBot,
    handleBotClick,
    serverStatus,
  } = useSocket();
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <TopBar
          startListening={startListening}
          stopListening={stopListening}
          serverStatus={serverStatus}
        />
        {showSingleBot ? (
          <SingleBot
            selectedBot={selectedBot}
            handleHideSingleBot={() => setShowSingleBot(false)}
            sendOne={sendOne}
          />
        ) : (
          <BotPanel
            bots={bots}
            broadcast={broadcast}
            onBotClick={handleBotClick}
          />
        )}
      </ThemeProvider>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
