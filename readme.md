# ElectronAck

## POC Javascript malware with control center.<br/>

In order to be in accordance with the law I removed some code from the client and the server.<br />
You can easily find some replacement code by searching on github.<br />
I also have to warn you that you can only use this code inside your own network.<br />
I'm sure you'll all do it because thre's only good guys on github :-)<br />
I made this POC to prove that you can build undetected malwares in javascript. At the time of the writing, the bot is not detected at all by virustotal.<br />

### Control center

The control center is written using electron framework, react and typescript.<br />
In order to use it it's a bit hard, you have to do _yarn install_ and _yarn start_ inside the Server folder.<br />
Once started you can click on "connect" to start listening on port 4444. A websocket server is instantiated and waiting for incoming connections.<br />
The UI is designed to be ugly and not user friendly at all.<br />

### Bot

The bot is written in javascript and it's a simple websocket client listening for commands from the server.<br />
The features I left are start with windows, hide window from desktop and download execute a remote file.<br />
It's really easy to add a lot of new commands.<br />
The bot is built with pkg, you can edit the config inside package.json.<br />
At the beginning of the project I wanted to use the DDOS parts with workers because multi threading is cool. But pkg and nexe doesn't support the workers. If someone succeeded with it I'm interested in a pull request.<br />
