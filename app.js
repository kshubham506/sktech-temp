var express = require("express");
const debug = require("debug")("app");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString("UTF-8");
    },
    extended: false,
  })
);
app.use(cors());
app.use(
  "/health",
  require("express-healthcheck")({
    healthy: () => {
      return {
        success: true,
        status: 200,
      };
    },
  })
);

app.post("/translate", async function (req, res) {
  try {

    res.status(200).send('Running fine');
  } catch (err) {

    res
      .status(404)
      .send({ status: "Translate Server error", msg: err.message });
  }
});

const server = app.listen(process.env.PORT || 3000, async function () {
  const debug = require("debug")("app:ServerStart");
  debug(
    `SkTech Backend Node Server | A SkTechHub Product | Port ${process.env.PORT || 3000
    }`
  );
});
