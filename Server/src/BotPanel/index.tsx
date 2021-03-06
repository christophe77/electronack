import React, { FC, useState, ChangeEvent } from "react";
import { Panel, TextField, Button } from "react95";
import Commands from "../common/Commands";
import { Bot } from "../types";

type BotPanelProps = {
  bots: Bot[];
  onBotClick: (botId: number) => void;
  broadcast: (message: string) => void;
};
const BotPanel: FC<BotPanelProps> = ({ bots, broadcast, onBotClick }) => {
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
              width: 300,
            }}
          >
            {bots?.length > 0 &&
              bots.map((bot) => {
                return (
                  <p
                    key={bot.id}
                    onClick={() => {
                      onBotClick(bot.id);
                    }}
                  >
                    {bot.name}-{bot.platform}
                  </p>
                );
              })}
          </Panel>
          <Commands />
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
            Send to all
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
