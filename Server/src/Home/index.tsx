import React, { FC } from "react";
import TopBar from "./TopBar";
import useSocket from "./useSocket";
import BotPanel from "./BotPanel";

const Home: FC = () => {
  const { bots, broadcast, startListening, stopListening, serverStatus } =
    useSocket();
  return (
    <>
      <TopBar
        startListening={startListening}
        stopListening={stopListening}
        serverStatus={serverStatus}
      />
      <BotPanel bots={bots} broadcast={broadcast} />
    </>
  );
};
export default Home;
