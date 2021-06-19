import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

let users = [{
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

let posts = [{
    id: '1',
    title: 'My story',
    published: true,
    author: "1",
    comment:"1"
},
{
    id: '2',
    title: 'My future',
    published: false,
    author: '2',
    comment: '2'
},
{   
    id: '3',
    title: 'My past',
    published: true,
    author: '3',
    comment: '3'
},
]


let comments = [
    {
        id: '1',
        text: "yo bad story man !!!",
        user: '1',
        post: '1'
    },
    {
        id: '2',
        text: "yo good story man !!!",
        user:'3',
        post:'3'
    },
    {
        id: '3',
        text: "yo future story man !!!",
        user:'1',
        post:'1'
    },
    {
        id: '4',
        text: "yo bad story man !!!",
        user: '3',
        post: '3'
    }
]

// typeDefs (Schema)
// type is used to define type of entity
// input is userd for defining arguments in query in form of object
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

    type Mutation {
        createUser(data: userArguments): User!
        createPost(data: postArguments): Post!
        createComment(data: commentArguments): Comment!
        deleteUser(id: ID!): User!
        deletePost(id: ID!): Post!
        deleteComment(id: ID!): Comment!
    }


    input userArguments {
        name: String!
        email: String! 
        age: Int
    } 

    input postArguments {
        title: String!
        published: Boolean!
        author: ID!
    }

    input commentArguments{
        text: String!
        user: ID!
        post: ID!
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
        comments: [Comment]!
    }

    type Comment {
        id: ID!
        text: String!
        user: User!
        post: Post!
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

    // mutation starts

    Mutation : {
        createUser : (parent, args, ctx, info) => {
            const emailTaken = users.some( user => user.email === args.data.email);

            if(emailTaken) {
                throw new Error("Email already exists");
            }

            const User =  {
                id : uuidv4(),
                ...args.data
            }

            users.push(User);

            return User;
        },

        createPost: (parent, args, ctx, info) => {
            const userExists = users.some(user => user.id === args.data.author);

            if(!userExists) throw new Error("user doesn't exists");

            const Post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(Post);
            return Post;
        },


        createComment: (parent, args, ctx, info) => {
            const postExists = posts.some(post => (post.id === args.data.post) && post.published);
            const userExists = users.some(user =>  user.id === args.data.user); 

            if(!postExists) throw new Error("post doesn't exists or published");
            if(!userExists) throw new Error("user doesn't exists");

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment);
            return comment;
        },

        deleteUser: (parent, args, ctx, info) => {
            const userIndex = users.findIndex(user => user.id === args.id);

            if(userIndex === -1) throw new Error("User doesn't exits");

            const deletedUser = users.splice(userIndex, 1);

            posts = posts.filter(post => {
                const match = post.author === args.id;

                if(match){
                    comments = comments.filter(comment => comment.user !== args.id)
                }

                return !match
            });

            comments = comments.filter(comment => comments.user !== args.id);
            
            return  deletedUser[0];
        },

        deletePost : (parent, args, ctx, info) => {
            const postIndex = posts.findIndex(post => post.id === args.id);

            if(postIndex === -1) throw new Error("Post doesn't exist");

            const deletedPost = posts.splice(postIndex, 1);

            comments = comments.filter(comment => comment.post !== args.id)

            return deletedPost[0];
        },

        deleteComment : (parent, args, ctx, info) => {
            const commentIndex = comments.findIndex(comment => comment.id === args.id);

            if(commentIndex === -1) throw new Error("comment doesn't exist");

            const deletedComment = comments.splice(commentIndex, 1);

            posts = posts.filter(post => post.comment !== args.id)

            return deletedComment[0];
        }

    },




    // relational data of posts of type Post with author
    Post: {
     author: (parent, agrs, ctx, info) => {
         // here parent is the each object of post
         // (parent.id, parent.title, parent.published, parent.authod) we have access of all val in obj.
        return   users.find(val => val.id === parent.author)
     },
     comments: (parent, args, ctx, info) => {
         return comments.filter(comment => parent.comment === comment.id)
     }
    },

     // relational data of users of type User with posts
    User: {
        posts: (parent, args, ctx, info) => posts.filter(post => post.author === parent.id),
        comments: (parent, args, ctx, info) => comments.filter(comment => comment.id === parent.id),
    },

    // relational data of comments of type Comment with user

    Comment: {
        user: (parent, args, ctx, info) => users.find(user => user.id === parent.user),
        post: (parent, args, ctx, info) => posts.find(post => post.id === parent.post)
    }

};


const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('running on 4000'));