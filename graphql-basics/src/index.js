import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        intro : String!
    }
`;

const resolvers = {
    Query:  {
        intro: () => 'Hello my self shubham'
    }
};


const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('running on 4000'));