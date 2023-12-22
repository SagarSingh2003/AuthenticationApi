const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jwtPassword = 'secret auth';


const user = [];
let app = express();

//user will send , u , p , e
// will delete the pass and generate a jwt
// will delete  

app.use(bodyParser.json());

app.get('/' , (req , res) => {
    res.json({
        "msg" : "got request successfully"
    })
})

app.get('/signup', (req , res) =>{
    const username = req.headers.username;
    const password = req.headers.password;
    const email = req.headers.email;


    for( let eachUser in user){
        console.log('checking ...');
        console.log(eachUser);
        if(eachUser.username == username){
            res.json({
                "msg" : "user already present"
            })
        }
    }

    userObject = {
        username : username ,
        email : email
    }

    user.push(userObject);
    const token = jwt.sign( userObject , jwtPassword , (err , token)=>{
        if(err) {
            console.log(err);
        }
        console.log(token);
            
        res.json({
            "token" : token
        })
    }); 
    

    
})


app.post('/signin' , (req , res , next) => {
    const username = req.body.email;
    console.log(username);
    const token = req.body.token;
    
    
    console.log('got request');

    let torF = false;
    
    for( let eachUser in user ){
        
        console.log('hello');
        console.log("this is post :", user[eachUser].email);
        console.log(username);
        if (username == user[eachUser].email){
            console.log('user found');
            const decoded = jwt.verify(token , jwtPassword , (err , decoded) => {
                if (err){
                    console.log(err);
                }
                console.log(decoded);
                torF = true;
                res.json({
                    "userData" : decoded
                })


            });


        }
    }

    if(!torF){
            
        res.json({
            "msg" : "user not found please signin first"
        })
    }




})

app.listen(3000 , () => {
    console.log('app listening at port 3000');
});