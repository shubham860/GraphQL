exports.Subscription = {
    count : {
        subscribe: (parent, args, ctx, info) => {
            const {pubSub} = ctx;
            let count = 0;

            setInterval(() => {
                count++;
                pubSub.publish('count', {count})
            }, 1000)

            return pubSub.asyncIterator('count');
        }
    },

    comment : {
        subscribe: (parent, args, ctx, info) => {
            const { db, pubSub } = ctx;
            const post = db.posts.find(post => post.id === args.post && post.published);

            if(!post) throw new Error("post doesn't exist");

            return pubSub.asyncIterator(`Comment ${args.post}`);
        }
    }
}