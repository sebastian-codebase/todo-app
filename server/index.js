const express = require("express");
const cors = require("cors");
const routeController = require("./controllers/routeController");

const app = express();
const port = 5000;

// Enable CORS for frontend communication
app.use(cors());
// Parsing application/json
app.use(express.json());

// Routes
routeController.getRoutes(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
