const express = require('express');
const noblox = require("noblox.js");
const { refreshCookie, fetchCookie } = require("./utilities/cookie");

const PORT = process.env.PORT || 8080;
const ONE_HOUR = 60 * 60 * 1000;
const app = express();

app.use(express.json())
app.use('/unity', require('./routes/unity'));
app.use('/', require('./routes/promotion'));
app.use('/', require('./routes/ban'));

app.get('/', (req, res) => {
  res.status(200).send("Welcome to our unity server");
});

const login = async () => {
  const { cookie } = await fetchCookie();

  await noblox.setCookie(cookie);

  return await noblox.getCurrentUser();
}

login()
  .then(current_user => {
    console.log(current_user);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}\nPress Ctrl+C to quit.`);
    });

    setInterval(refreshCookie, ONE_HOUR)
  })
  .catch(err => console.log("\n\nException during initial cookie auth\n\n", err));

module.exports = app;
