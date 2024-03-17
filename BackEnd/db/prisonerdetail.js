const mongoose=require('mongoose');

const prisonerSchema = new mongoose.Schema({
    name:String,
    password:String
});
module.exports= mongoose.model("prisonerdetails",prisonerSchema);
