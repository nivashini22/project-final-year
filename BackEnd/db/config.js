require('dotenv').config();
const mongoose = require("mongoose");
// const uri = "mongodb://localhost:27017/prisoner";
const uri = process.env.DATABASE_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(() => {
    console.log("DB CONNECTED")
}).catch((err) => {
    console.log(err)
    console.log("DB GOT OOPS")
});