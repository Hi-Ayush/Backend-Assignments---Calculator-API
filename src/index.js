const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get("/",(req,res)=>{
    res.send("Hello World");
})


const isValidAddition=(num1,num2)=>{
    if(num1+num2>1000000){
        return({status: "error",message:"Overflow"});
    }
    else if(num1+num2<-1000000){
        return ({status: "error",message:"Underflow"});
    }
    else{
      return ( {
            status: "success",
            message: "the sum of given two numbers",
            sum: num1+num2
            });
    }
}
const isValidSubtraction=(num1,num2)=>{
    if(num1-num2>1000000){
        return({status: "error",message:"Overflow"});  
    }
    else if(num1-num2<-1000000){
        return ({status: "error",message:"Underflow"});
    }
    else{
        return ({
            status:"success",
            message:"the difference of given two numbers",
            difference: num1-num2
        });
    }
}
const isValidMultiplication=(num1,num2)=>{
    if(num1*num2>1000000){
        return({status: "error",message:"Overflow"});  
    }
    else if(num1*num2<-1000000){
        return ({status: "error",message:"Underflow"});
    }
    else {
        return ({
            status:"success",
            message:"The product of given numbers",
            result: num1*num2
        });
    }
}

const isValidDivision=(num1,num2)=>{
    if(num2===0){
        return ({status: "error",message:"Cannot divide by zero"});
    }
    else{
        return ({
            status:"success",
            message:"The division of given numbers",
            result: num1/num2
        });
    }
}

const isValidInput=(num1,num2,operation)=>{

    if(isNaN(num1)||isNaN(num2)){
        return ({status: "error",message:"Invalid data types"});
    }

    num1=parseFloat(num1);
    num2=parseFloat(num2);    
    if(num1<-1000000||num2<-1000000){
        return ({status: "error",message:"Underflow"});
    }
    if(num1>1000000||num2>1000000){
        return({status: "error",message:"Overflow"});
    }
   
    if(operartion==="add"){
        isValidAddition(num1,num2);
    };
    if(operation==="dif"){
        isValidSubtraction(num1,num2);
    }
    if(operation==="mul"){
        isValidMultiplication(num1,num2);
    }
    if(operation==="div"){
        isValidDivision(num1,num2);
    }
}

app.post("/add",(req,res)=>{
    res.send(isValidInput(req.body.num1,req.body.num2,"add"));
})
app.post("/sub",(req,res)=>{
    res.send(isValidInput(req.body.num1,req.body.num2,"dif"));
})
app.post("/multiply",(req,res)=>{
    res.send(isValidInput(req.body.num1,req.body.num2,"mul"));
})
app.post("/divide",(req,res)=>{
    res.send(isValidInput(req.body.num1,req.body.num2,"div"));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;