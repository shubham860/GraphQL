import { v4 as uuidv4 } from 'uuid';

exports.Mutation =  {
    createUser : (parent, args, ctx, info) => {
        const {db} = ctx;
        const emailTaken = db.users.some( user => user.email === args.data.email);

        if(emailTaken) {
            throw new Error("Email already exists");
        }

        const User =  {
            id : uuidv4(),
            ...args.data
        }

        db.users.push(User);

        return User;
    },

    createPost: (parent, args, ctx, info) => {
        const {db} = ctx;
        const userExists = db.users.some(user => user.id === args.data.author);

        if(!userExists) throw new Error("user doesn't exists");

        const Post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(Post);
        return Post;
    },


    createComment: (parent, args, ctx, info) => {
        const {db, pubSub} = ctx;
        const postExists = db.posts.some(post => (post.id === args.data.post) && post.published);
        const userExists = db.users.some(user =>  user.id === args.data.user); 

        if(!postExists) throw new Error("post doesn't exists or published");
        if(!userExists) throw new Error("user doesn't exists");

        const Comment = {
            id: uuidv4(),
            ...args.data
        }
        console.log("comment", Comment)

        db.comments.push(Comment);
        return Comment;
    },      

    deleteUser: (parent, args, ctx, info) => {
        const {db} = ctx;
        const userIndex = db.users.findIndex(user => user.id === args.id);

        if(userIndex === -1) throw new Error("User doesn't exits");

        const deletedUser = db.users.splice(userIndex, 1);

        db.posts = db.posts.filter(post => {
            const match = post.author === args.id;

            if(match){
                db.comments = db.comments.filter(comment => comment.user !== args.id)
            }

            return !match
        });

        db.comments = db.comments.filter(comment => db.comments.user !== args.id);
        
        return  deletedUser[0];
    },

    deletePost : (parent, args, ctx, info) => {
        const {db} = ctx;
        const postIndex = db.posts.findIndex(post => post.id === args.id);

        if(postIndex === -1) throw new Error("Post doesn't exist");

        const deletedPost = db.posts.splice(postIndex, 1);

        db.comments = db.comments.filter(comment => comment.post !== args.id)

        return deletedPost[0];
    },

    deleteComment : (parent, args, ctx, info) => {
        const {db} = ctx;
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

        if(commentIndex === -1) throw new Error("comment doesn't exist");

        const deletedComment = db.comments.splice(commentIndex, 1);

        db.posts = db.posts.filter(post => post.comment !== args.id)

        return deletedComment[0];
    },

    updateUser: (parent, args, ctx, info ) => {
        const { db } = ctx;
        const { id, data} = args;
        
        const User = db.users.find(user => user.id === id);

        if(!User) throw new Error("User doesn't Exist");

        return {...User, ...data };
        
    },

    updateComment: (parent, args, ctx, info) => {
        const { db } = ctx;
        const { id, data} = args;
        
        const Comment = db.comments.find(comment => comment.id === id);

        if(!Comment) throw new Error("Comment doesn't Exist");

        return {...Comment, ...data };
    },
    
    updatePost: (parent, args, ctx, info) => {
        const { db } = ctx;
        const { id, data} = args;
        
        const Post = db.posts.find(post => post.id === id);

        if(!Post) throw new Error("Post doesn't Exist");

        return {...Post, ...data };
    },




}