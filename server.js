const express = require('express');
require('dotenv').config();
const jwt = require("express-jwt"); //validate JWT and set req.user
const jwtRsa = require("jwks-rsa"); //Retrieve RSA keys from a JSON Web Key server
const checkScope = require('express-jwt-authz'); // Validate JWT scopes

const checkjwt = jwt({
    secret: jwtRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    // Validate the audience and the issuer
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    algorithms: ["RS256"]
})


const app = express();

app.get('/public', function (req,res) {
    res.json({
        message: "Hello from a public API"
    });
});

app.get('/private',checkjwt, function (req,res) {
    res.json({
        message: "Hello from a private API"
    });
});

app.get('/course',checkjwt, checkScope(["read:courses"]), function (req,res) {
    res.json({
        courses: [
            { id: 1, title: "Building App with React and Redux"},
            { id: 2, title: "Creating Reusable React Components"}
        ]
    });
});

app.listen(3001);

console.log("API sever listening on " + process.env.REACT_APP_AUTH0_AUDIENCE)