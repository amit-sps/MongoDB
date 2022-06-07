const express=require("express");
const port=process.env.PORT||5040;
const app=express();

app.get("/",(req,res)=>{
    res.status(200).send("Hello MongoDB");
});

app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}`);
})