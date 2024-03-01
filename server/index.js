const express = require("express");
const routes = require('./routes/index');
const cors = require("cors");
const db = require("./models");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
routes(app)

app.use((err, req, res, next) => {
	console.log(`Erreur: ${err.message}`);
	res.status(err.status ? err.status : 500).send(err.message);
});

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT);
    console.log(`http://localhost:${PORT}`);
  } catch (e) {
    console.error("Error connecting to the db ", e);
  }
})();
