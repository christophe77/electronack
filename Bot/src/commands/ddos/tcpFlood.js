function tcpFlood(datas) {
  const args = datas.split(" ");
  const ip = args[1];
  const port = args[2];
  const duration = args[3];
  //
  // Implement your logic here
  //
  try {
    setTimeout(() => {
      console.log(`${ip}:${port}`);
    }, duration);
  } catch (error) {
    return error;
  }
}
module.exports = tcpFlood