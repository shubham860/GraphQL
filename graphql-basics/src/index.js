import { GraphQLServer } from 'graphql-yoga';


// typeDefs (Schema)
const typeDefs = `
    type Query {
       add(a: Float, b: Float): Float!,
       greeting(name: String): String!,
       me: User!,
       post: Post!
    }

    type User {
        id : ID!,
        name: String!,
        email: String!,
        age: Int
    }

    type Post {
        id: ID!,
        name: String!,
        published: Boolean!,
    }
`;

// resolvers
const resolvers = {
    Query:  {
       add : (parent, args, ctx, info) => args.a && args.b ? args.a + args.b : 0,
       greeting(parent, args, ctx, info) {
           return args.name ? `Hello ${args.name}` : `Hello`;
       }, 
       me() {
           return {id: '124', name: "shubham", email: 'shubham.chauhan@gmail.com', age: 12}
       },
       post() {
           return {id: 'abc', name: "drama", published: false}
       }
    }
};


const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('running on 4000'));