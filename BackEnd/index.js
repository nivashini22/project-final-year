const express = require('express');
const cors = require('cors');
require("./db/config");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/user");
const caseRoutes = require("./routes/case");

app.use("/api", userRoutes);
app.use("/api", caseRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
