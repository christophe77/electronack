import React, { FC } from "react";
import { AppBar, Toolbar, Button, Bar } from "react95";
import { ServerStatus } from "../types";

type TopBarProps = {
  startListening: () => void;
  stopListening: () => void;
  serverStatus: ServerStatus;
};

const TopBar: FC<TopBarProps> = ({
  startListening,
  stopListening,
  serverStatus,
}) => {
  return (
    <AppBar style={{ position: "relative", width: "100%" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => {
            serverStatus.connected ? stopListening() : startListening();
          }}
          style={{ fontWeight: "bold" }}
        >
          {serverStatus.connected ? "Disconnect" : "Connect"}
        </Button>
        <Bar />
        <span>ElectronAck</span>
        <Bar />
        <span>server status : {serverStatus.status}</span>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
