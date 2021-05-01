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


const comments = [
    {
        id: '1',
        text: "yo bad story man !!!",
        user: '1'
    },
    {
        id: '2',
        text: "yo good story man !!!",
        user:'3'
    },
    {
        id: '3',
        text: "yo future story man !!!",
        user:'1'
    },
    {
        id: '4',
        text: "yo bad story man !!!",
        user: '3'
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
       posts(query: [String!]): [Post!]!
       comments(query: [String!]): [Comment!]!
       me: User!
       post: Post!
       comment: Comment!
    }

    type User {
        id : ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        user: User!
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

         return posts.filter(val => val.title.toLowerCase().includes(args.query[0].toLowerCase()))
       },

       comments: (parent, args, ctx, info) => {
           if(!args.query){
               return comments;
           }
           
           return comments.filter(comment => comment.text.toLowerCase().includes(args.query[0].toLowerCase()))

       },

       me() {
           return {id: '124', name: "shubham", email: 'shubham.chauhan@gmail.com', age: 12}
       },


       post() {
           return {id: 'abc', title: "drama", published: false}
       },

       comment : () => ({id: 1, text:'im a comment'})
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
        posts: (parent, args, ctx, info) => posts.filter(post => post.author === parent.id),
        comments: (parent, args, ctx, info) => comments.filter(comment => comment.id === parent.id),
    },

    // relational data of comments of type Comment with user

    Comment: {
        user: (parent, args, ctx, info) => users.find(user => user.id === parent.user)
    }

};


const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('running on 4000'));