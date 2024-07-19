const express = require('express');
const { handler } = require('./controller/index');
const serverless = require('serverless-http')

const PORT = process.env.PORT || 4040;

const app = express();
app.use(express.json())

app.post('*', async (req, res) => {
  console.log(req.body)
  res.send(await handler(req, "POST"));
});

app.get('*', async (req, res) => {
  res.send(await handler(req, "GET"));
})

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log("Server listening on PORT", PORT);
})


module.exports = app


//   "version": 2,
//   "builds": [
//     {
//       "src": "./index.js",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/(.*)",
//       "dest": "/"
//     }
//   ]
// 