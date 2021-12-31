const os = require("os");

const informations = (ws) => {

  const infos = {
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    uptime: os.uptime(),
  };
  ws.send(`informations ${JSON.stringify(infos)}`);
};

module.exports = informations;
