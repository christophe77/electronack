const os = require("os");

const uniqueId = Math.round(+new Date() / 1000);

const identification = {
  name: os.hostname(),
  platform: os.platform(),
  id: uniqueId,
};
module.exports = identification;
