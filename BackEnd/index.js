// prisonerdetail.js
const express = require('express');
const cors = require('cors');
require("./db/config");
const Prisoner = require('./db/prisonerdetail');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/login', async (req, res) => {
//    res.send(req.body);
if(req.body.password && req.body.name){
        
    
    let prisoner = await Prisoner.findOne(req.body);
    // removes only password field
    if(prisoner)
    {
        res.send(prisoner);
    }else{
        res.send({result:"no user found"});

    }
}else{
    res.send({result:"no user found"});
}

  
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
