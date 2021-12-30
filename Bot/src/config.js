const common = {
  ip: "127.0.0.1",
  port: 4444,
  binName: "evil",
};
const windowsInstallPath = `${process.env.APPDATA}\\${common.binName}\\`;

const config = {
  common, windowsInstallPath
}
module.exports = config;
