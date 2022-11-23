const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 6500;
require("dotenv").config();


//middleware
app.use(cors());
app.use(express.json());



const uri = process.env.MONGO_URI
// console.log(uri)
 
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {

    app.post('/jwt', async(req, res)=>{
      const email = req.body
      console.log(email)
      const token =  jwt.sign(email, 'dsfukjrtwhiufhsdjfouaoiuf', {expiresIn: '7d'})
      res.send({token})
    })

  } 
  
  finally {

  }
}

run().catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("This is CORS-enabled for all origins!");
});

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
