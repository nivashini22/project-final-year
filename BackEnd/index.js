const express = require('express');
const cors = require('cors');
require("./db/config");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/user");

app.use("/api", userRoutes);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
