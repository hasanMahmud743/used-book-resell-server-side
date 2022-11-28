const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 6500;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
// console.log(uri)

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const bookCategories = client.db("KnowledgeDB").collection("book-collection");
  const orderedList = client.db("KnowledgeDB").collection("order-collection");
  const userList = client.db("KnowledgeDB").collection("user-collection");
  const productList = client.db("KnowledgeDB").collection("product-collection");
  const advertiseCOllection = client.db("KnowledgeDB").collection("advertise-collection");


  try {
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      console.log(email);
      const token = jwt.sign(email, "dsfukjrtwhiufhsdjfouaoiuf", {
        expiresIn: "7d",
      });
      res.send({ token });
    });

    app.get("/categories/:title", async (req, res) => {
      const categories = req.params.title;
      const cursor = { categories };
      const result = await bookCategories.find(cursor).toArray();
      res.send(result);
    });

    app.post("/categories", async (req, res) => {
      const order = req.body;
      const result = await orderedList.insertOne(order);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const order = req.body;
      const result = await userList.insertOne(order);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const cursor = {};
      const result = await orderedList.find(cursor).toArray();
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productList.insertOne(product);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const email = req.query.email;
      let cursor = {};
      if (email) {
        cursor = { email };
      }
      const result = await productList.find(cursor).toArray();
      res.send(result);
    });

    app.get("/allUser", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      let cursor = {};
      if (email) {
        cursor = { email };
      }

      const result = await userList.findOne(cursor);
      res.send(result);
    });

    app.get("/allSeller", async (req, res) => {
      const cursor = { accountType: "seller" };
      const result = await userList.find(cursor).toArray();
      res.send(result);
    });

    app.delete("/allSeller/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: ObjectId(id) };
      const result = await userList.deleteOne(cursor)
      res.send(result);
    });

    app.get("/allBuyer", async (req, res) => {
      const cursor = { accountType: "normal" };
      const result = await userList.find(cursor).toArray();
      res.send(result);
    });

    app.delete("/allBuyer/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: ObjectId(id) };
      const result = await userList.deleteOne(cursor)
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: ObjectId(id) };
      const result = await productList.deleteOne(cursor);
      res.send(result);
    });

    app.get('/product/:id', async(req, res)=>{
      const id = req.params.id
      const cursor = {_id: ObjectId(id)}
      const result = await productList.findOne(cursor)
      res.send(result)
    })

    app.post('/advertise', async(req, res)=>{
      const advertise = req.body
      const result = advertiseCOllection.insertOne(advertise)
      res.send(result)
    })

    app.get('/advertise', async(req, res)=>{
      // const advertise = req.body
      const cursor = {}
      const result = await advertiseCOllection.find(cursor).toArray()
      res.send(result)
    })


  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("This is CORS-enabled for all origins!");
});

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
