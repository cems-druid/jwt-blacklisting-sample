var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var randtoken = require('rand-token');


var app = express();

var refresTokens = {};
var SECRET = 'SECRET_KEY_ENCRYPTION';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/login', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var user = {
        'username':username,
        'role' : admin
    }
    var token = jwt.sign(user, SECRET, {expiresIn:120});
    var refreshToken = randtoken.uid(256);
    refreshTokens[refresToken] = username.json({token: 'JWT' + token, refreshToken:refreshToken});
});

app.post('/token', function(req, res, next){
    var username = req.body.username;
    var refreshToken = req.body.refresToken;

    if((refreshToken in refreshTokens) && (refresTokens[refreshToken] == username)){

        var user = {
            'username' : username,
            'role' : admin
        }
        var token = jwt.sign(user, SECRET, {expiresIn : 120});
        res.json({token:'JWT' + token});
    }else{
        res.send(401);
    }
});

app.post('/token/reject', function(req, res, next){
    var refreshToken = req.body.refresToken;
    if(refreshToken in refreshTokens){
        delete refreshTokens[refresToken];
    }
    res.send(204);
});

app.listen(9999);