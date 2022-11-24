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
const bookCategories = client.db('KnowledgeDB').collection('book-collection')
const orderedList = client.db('KnowledgeDB').collection('order-collection')
const userList = client.db('KnowledgeDB').collection('user-collection')



  try {

    app.post('/jwt', async(req, res)=>{
      const email = req.body
      console.log(email)
      const token =  jwt.sign(email, 'dsfukjrtwhiufhsdjfouaoiuf', {expiresIn: '7d'})
      res.send({token})
    })

    app.get('/categories/:title', async(req, res)=>{
      const categories = req.params.title
      const cursor = {categories}
      const result = await bookCategories.find(cursor).toArray()
      res.send(result)
    })

    app.post('/categories', async(req, res)=>{
      const order = req.body
      const result = await orderedList.insertOne(order)
      res.send(result)

    })

    app.post('/users', async(req, res)=>{
      const order = req.body
      const result = await userList.insertOne(order)
      res.send(result)

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
