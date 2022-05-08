const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = 5000;
const app = express();

require("dotenv").config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.eeaha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("items").collection("item");
//   console.log('database connecteed sucessfully');
//   // perform actions on the collection object
  
//   client.close();
// });


async function run(){
    try{
      await client.connect();
      const productcollection = client.db("items").collection("item");

      //Featching data

      app.get("/products", async (req, res) => {
        const query = {};
        const cursor = productcollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
      });

    }
    finally{

    }
  }
  run().catch(console.dir);




app.get("/", (req,res) => {
    res.send("Server is running succesfully. Now connect mongodb to your server")
})

app.listen(port, () => {
    console.log("server is running");
})