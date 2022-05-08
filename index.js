const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = 8000;
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

app.get("/", (req, res) => {
    res.send("Server is running succesfully. Now connect mongodb to your server")
})
async function run() {
    try {
        await client.connect();
        const productcollection = client.db("items").collection("item");

        //Featching data

        app.get("/products", async (req, res) => {
            const query = {};
            const cursor = productcollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });


        // for single data

        app.get("/inventory/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productcollection.findOne(query);
            res.send(product);
        });

    }
    finally {

    }

    app.post("/contact", (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message; 
        const mail = {
          from: name,
          to: "kanizfatema0184@gmail.com",
          subject: "Contact Form Submission",
          html: `<p>Name: ${name}</p>
                 <p>Email: ${email}</p>
                 <p>Message: ${message}</p>`,
        };
        contactEmail.sendMail(mail, (error) => {
          if (error) {
            res.json({ status: "ERROR" });
          } else {
            res.json({ status: "Message Sent" });
          }
        });
      });
}
run().catch(console.dir);






app.listen(port, () => {
    console.log("server is running");
})