import React, { FC, useState, ChangeEvent } from "react";
import { Panel, TextField, Button } from "react95";
import { Bot } from "../types";
import Commands from "../common/Commands";

type SingleBotProps = {
  selectedBot: Bot;
  handleHideSingleBot: () => void;
  sendOne: (message: string, id: number) => void;
};
const SingleBot: FC<SingleBotProps> = ({
  selectedBot,
  sendOne,
  handleHideSingleBot,
}) => {
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
            <Button style={{ marginBottom: 8 }} onClick={handleHideSingleBot}>
              Back
            </Button>

            {selectedBot && (
              <ul>
                <li>Name : {selectedBot.informations?.hostname}</li>
                <li>
                  Platform : {selectedBot.informations?.platform}{" "}
                  {selectedBot.informations?.arch}
                </li>
                <li>Uptime : {selectedBot.informations?.uptime}</li>
              </ul>
            )}
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
            onClick={() => sendOne(command, selectedBot.id)}
            style={{ marginLeft: 4, minWidth: 200 }}
          >
            Send to single bot
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
          Send command to {selectedBot.informations?.hostname}
        </Panel>
      </Panel>
    </>
  );
};
export default SingleBot;
