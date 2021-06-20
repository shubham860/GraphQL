exports.Query = {

       users: (parent, args, ctx, info) => {
           const {db} = ctx;
           if(!args.query){
              return db.users
           }

           return db.users.filter(val => val.name.toLowerCase().includes(args.query[0].toLowerCase()))
       },


       posts: (parent, args, ctx, info) => {
        const {db} = ctx;
        if(!args.query){
            return db.posts
         }

         return db.db.posts.filter(val => val.title.toLowerCase().includes(args.query[0].toLowerCase()))
       },

       comments: (parent, args, ctx, info) => {
        const {db} = ctx;
           if(!args.query){
               return db.comments;
           }
           
           return db.comments.filter(comment => comment.text.toLowerCase().includes(args.query[0].toLowerCase()))

       },

       me() {
           return {id: '124', name: "shubham", email: 'shubham.chauhan@gmail.com', age: 12}
       },


       post() {
           return {id: 'abc', title: "drama", published: false}
       },

       comment : () => ({id: 1, text:'im a comment'})
       

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
}