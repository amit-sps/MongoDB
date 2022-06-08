const express = require("express");
const port = process.env.PORT || 5040;
const app = express();
let connection = require("./db");
const dbName = "softprodigyintern";
const mongodb=require("mongodb");
// Middleware...
app.use(express.json())


// Create Data..............
app.post("/user",async(req,res)=>{
    try{
        const {name,email,address,state}=req.body;
        if(!name||!email||!address||!state)
        return res.status(400).send("all field is require!");
        const client=await connection();
        const db=client.db(dbName);
        const collection=db.collection("demo");
        const addedData=await collection.insertOne({name,email,address,state});
       if(!addedData.insertedId)
       return res.status(400).send("Something went wrong!");
       return res.status(200).send("Data added!");
    }catch(err){
        console.log(err)
        res.status(404).send("something went wrong!")
    }
})

// Get ALL Data from database.........
app.get("/user", async (req, res) => {
  try {
    const client = await connection();
    const db=client.db(dbName)
    const collection=db.collection("demo")
    const data=await collection.find({}).toArray();
    res.send(data)
  } catch (err) {
    console.error(err);
    res.status(400).send("Something went Wrong!");
  }
});

// Get Data By Id
app.get("/user/:_id",async(req,res)=>{
    try{
        let {_id}=req.params;
        if(!_id)
        return res.status(400).send("Id is required!")
        const client = await connection();
        const db=client.db(dbName);
        const collection=db.collection("demo");
        _id=mongodb.ObjectId(_id)
        const theData=await collection.findOne({_id});
        if(!theData)
        return res.status(400).send("Data not Found!");
        return res.status(200).send(theData)
    }
    catch(err){
        console.log(err)
        res.status(400).send("Something went Wrong!");
    }
})

// Update Data By id.........
app.patch("/user/:_id",async(req,res)=>{
    try{
        let {_id}=req.params;
        if(!_id)
        return res.status(400).send("Id is required!")
        if(Object.keys(req.body).length===0)
        return res.status(400).send("Data required for update!")
        const client = await connection();
        const db=client.db(dbName);
        const collection=db.collection("demo");
        _id=mongodb.ObjectId(_id)
        const isUpdated=await collection.updateOne({_id},{$set:req.body});
        if(!isUpdated.matchedCount)
        return res.status(400).send("Data not Found!")
        return res.status(200).send("data changed!")
    }catch(err){
        console.log(err);
        res.status(400).send("Something went Wrong!");
    }
})

// Delete By Id..........
app.delete("/user/:_id",async(req,res)=>{
    try{
        let {_id}=req.params;
        if(!_id)
        return res.status(400).send("Id is required!")
        const client = await connection();
        const db=client.db(dbName);
        const collection=db.collection("demo");
        _id=mongodb.ObjectId(_id)
        const isDeleted=await collection.deleteOne({_id});
        if(!isDeleted.deletedCount)
        return res.status(400).send("Data not Found!")
        return res.status(200).send("data deleted!")
    }catch(err){
        console.log(err);
        res.status(400).send("Something went Wrong!");
    }
})

app.get("/", (req, res) => {
  res.status(200).send("Hello MongoDB");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
