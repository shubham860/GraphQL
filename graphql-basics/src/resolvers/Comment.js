exports.Comment =  {
    user: (parent, args, ctx, info) => {
        const {db} = ctx;
        db.users.find(user => user.id === parent.user);
    },
    post: (parent, args, ctx, info) => {
        const {db} = ctx;
        db.posts.find(post => post.id === parent.post);
    }
}