var express=require('express')
var http=require('http')
var bodyParser=require('body-parser')
var passport=require('passport')
var port = process.env.PORT || 8080;

var authJwtController=require('./auth_jwt');
//var authController=require('./auth');

db=require('./db')();
var jwt=require('jsonwebtoken');
var app=express();
app.use(passport.initialize());
app.use(bodyParser.json({
    type: function(req){
        return 'application/json';
    }
}));

app.post('/signup',function(req,res){
    
    res=res.status(200)
    console.log(req.body);
    if(req.body.username&& req.body.password){
        let responseData={
            success: true,
            msg: 'Successful created new user.'
        }
        var newUser={
            username: req.body.username,
            password: req.body.password
        };
        db.save(newUser);
        res.json(responseData);
    }else{
        let responseData={
            success: false,
            msg: 'Missing username or password'
        }
        res.json(responseData);
    }
    
    

});
app.get('/signup',function(req,res){
    res.json({success: false,msg: 'Invalid method'});
});

app.post('/signin',function(req,res){
    var user=db.findOne(req.body.username);
    if(!user){
        res.status(401).send({success:false,msg:"User not found"})
    }else{
        if(req.body.password==user.password){
            var userToken={id:user.id,username:user.username}
            var token=jwt.sign(userToken,authJwtController.secret);
            res.json({success: true,token:'JWT'+token});
        }
    }

    res.send(JSON.stringify(responseData));
});

app.get('/signin',function(req,res){
    res.json({success: false,msg: 'Invalid method'});
})

app.get('/movies',function(req,res){
});
    
app.post('/movies',function(req,res){
    
});
app.put('/movies',function(req,res){
    
});
app.delete('/movies',function(req,res){
    
});
http.createServer(app).listen(port,()=>{
    console.log("App is running on port " +port);
});
console.log("starting")