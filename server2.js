var express = require('express');
const {graphqlHTTP} = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

//dummy data

var coursesData = [
    {
        id: 1,
        title: 'Node.js course',
        author: 'Pippo Franco',
        description: 'Impara node.js con pippo franco',
        topic: 'node.js',
        url: 'http://www.bellissimocorso.com/node.js'
    },
    {
        id: 2,
        title: 'React.js course',
        author: 'Pippo Pelo',
        description: 'Impara node.js con pippo pelo',
        topic: 'react.js',
        url: 'http://www.bellissimocorso.com/react.js'
    },
    {
        id: 3,
        title: 'python per tutti',
        author: 'Pippo Baudo',
        description: 'Impara node.js con pippo baudo',
        topic: 'python',
        url: 'http://www.bellissimocorso.com/pythonpy'
    }
]

var getCourse = function(args){
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

var getCourses = function(args){
    if(args.topic){
        var topic = args.topic;
        return coursesData.filter(courses=> course.topic === topic);
    } else {
        return coursesData;
    }
}

var updateCourseTopic = function({id, topic}){
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id)[0];
}

// Root resolver
var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
};

// Create an express server and a GQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true //for the UI
}));

app.listen(4000, () => console.log('Express GQL Server now Running on localhost:4000/graphql!'));

