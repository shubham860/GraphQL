exports.User =  {
    posts: (parent, args, ctx, info) => {
        const {db} = ctx;
        db.posts.filter(post => post.author === parent.id);
    },
    comments: (parent, args, ctx, info) => {
        const {db} = ctx;
        db.comments.filter(comment => comment.id === parent.id);
    },
}