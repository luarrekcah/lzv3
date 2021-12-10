const express = require("express"),
  app = express();


require(__dirname + "/bot.js")(app);

 app.get("/", function(req, res) {
    res.sendStatus(200);
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(
      `Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
    );
  });

module.exports = app;
