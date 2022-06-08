const {MongoClient}=require("mongodb")

const url="mongodb://localhost:27017";

const connection=async()=>{
    try{
    const client=new MongoClient(url);
    const db=await client.connect();
    console.log("database connected!")
    
    return client;
}
catch(err){
    console.log("Erroor")
    console.log(err);
}
}
module.exports=connection