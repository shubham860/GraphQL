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
];

const posts = [{
    id: '1',
    title: 'My story',
    published: true,
    author: "1"
},
{
    id: '2',
    title: 'My future',
    published: false,
    author: '2'
},
{   
    id: '3',
    title: 'My past',
    published: true,
    author: '3'
},
]

// typeDefs (Schema)
const typeDefs = `
    type Query {
       add(a: Float, b: Float): Float!
       addArray(numbers: [Float!]!) : Float!
       grade : [Int!]!
       greeting(name: String): String!

       users(query: [String!]): [User!]!
       posts(query: [String!]): [Post!]!
       me: User!
       post: Post!
    }

    type User {
        id : ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]! 
    }

    type Post {
        id: ID!
        title: String!
        published: Boolean!
        author: User!
    }
`;

// resolvers
const resolvers = {

    Query:  {

    // Beg level resolvers    
    //    add : (parent, args, ctx, info) => args.a && args.b ? args.a + args.b : 0,

    //    addArray : (parent, args, ctx, info) => {
    //      if(args.numbers.length === 0){
    //          return 0;
    //      }

    //      return args.numbers.reduce((A,C) => A+C)
    //    },

    //    grade : () => [1,2,3,4],

    //    greeting(parent, args, ctx, info) {
    //        return args.name ? `Hello ${args.name}` : `Hello`;
    //    }, 




       users: (parent, args, ctx, info) => {
           if(!args.query){
              return users
           }

           return users.filter(val => val.name.toLowerCase().includes(args.query[0].toLowerCase()))
       },


       posts: (parent, args, ctx, info) => {
        if(!args.query){
            return posts
         }
         console.log('args',args)

         return posts.filter(val => val.title.toLowerCase().includes(args.query[0].toLowerCase()))
       },

       me() {
           return {id: '124', name: "shubham", email: 'shubham.chauhan@gmail.com', age: 12}
       },


       post() {
           return {id: 'abc', title: "drama", published: false}
       }
    },

    // relational data of posts of type Post with author
    Post: {
     author: (parent, agrs, ctx, info) => {
         // here parent is the each object of post
         // (parent.id, parent.title, parent.published, parent.authod) we have access of all val in obj.
        return   users.find(val => val.id === parent.author)
     }
    },

  // relational data of users of type User with posts
    User: {
        posts: (parent, args, ctx, info) => posts.filter(post => post.author === parent.id)
    }

};


const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('running on 4000'));