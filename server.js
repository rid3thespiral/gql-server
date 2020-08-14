var express = require('express');
var express_gql = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!';
};

// Create an express server and a GQL endpoint
var app = express();
app.use('/graphql')

