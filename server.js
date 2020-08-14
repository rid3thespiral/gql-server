var express = require('express');
const {graphqlHTTP} = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!'
};

// Create an express server and a GQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true //for the UI
}));

app.listen(4000, () => console.log('Express GQL Server now Running on localhost:4000/graphql!'));

