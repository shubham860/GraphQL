import { GraphQLServer } from 'graphql-yoga';



const users = [{
    id: '1',
    name: 'shubham',
    email: 'xyz@gmail.com'
},
{
    id: '2',
    name: 'ritz',
    email: 'ritz@gmail.com'
},
{
    id: '3',
    name: 'ravero',
    email: 'ravero@gmail.com'
}
]

// typeDefs (Schema)
const typeDefs = `
    type Query {
       add(a: Float, b: Float): Float!
       addArray(numbers: [Float!]!) : Float!
       grade : [Int!]!
       greeting(name: String): String!

       users(query: [String!]): [User!]!
       me: User!
       post: Post!
    }

    type User {
        id : ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        name: String!
        published: Boolean!
    }
`;

// resolvers
const resolvers = {
    Query:  {
       add : (parent, args, ctx, info) => args.a && args.b ? args.a + args.b : 0,

       addArray : (parent, args, ctx, info) => {
         if(args.numbers.length === 0){
             return 0;
         }

         return args.numbers.reduce((A,C) => A+C)
       },

       grade : () => [1,2,3,4],

       greeting(parent, args, ctx, info) {
           return args.name ? `Hello ${args.name}` : `Hello`;
       }, 



  

       users: (parent, args, ctx, info) => {
           if(!args.query){
              return users
           }

           return users.filter(val => val.name.toLowerCase().includes(args.query[0].toLowerCase()))
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