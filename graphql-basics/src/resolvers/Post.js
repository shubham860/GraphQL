// relational data of db.posts of type Post with author

exports.Post =  {
 author: (parent, agrs, ctx, info) => {
     // here parent is the each object of post
     // (parent.id, parent.title, parent.published, parent.authod) we have access of all val in obj.
    const {db} = ctx;
    return   db.users.find(val => val.id === parent.author);
 },
 comments: (parent, args, ctx, info) => {
     return db.comments.filter(comment => parent.comment === comment.id);
 }
}