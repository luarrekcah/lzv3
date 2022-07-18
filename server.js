const express = require("express"),
  app = express();

 app.get("/", function(req, res) {
    res.sendStatus(200);
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(
      `Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
    );
  });

require(__dirname + "/bot.js")(app);

module.exports = app;

