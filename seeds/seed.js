const sequelize = require(`../config/connection`);
const {Comment, User, Post } = require(`../models`);

const userData = [
    {
        username: `Spongebob`,
        password: `gary`,
    },
    {
        username: `Patrick`,
        password: `rock`,
    },
    {
        username: `Krabs`,
        password: `money`,
    },
    {
        username: `Squidward`,
        password: `music`,
    }
]

const postData = [
    {
        title: `Spongebob first post`,
        content: `Hello everyone`,
        userid: 1,
    },{
        title: `How do I use this`,
        content: `Rock`,
        userid: 2,
    },{
        title: `Money`,
        content: `Give me money`,
        userid: 3,
    },{
        title: `Music`,
        content: `Listen to my music`,
        userid: 4,
    }
]

const commentData = [
    {
        content: `hi!`,
        userId: 2,
        postId: 1,
    }, {
        content: `No`,
        userId: 3,
        postId: 1,
    }, 
]

const seedMe = async()=>{
    await sequelize.sync({force:true});
    
    const dbUsers = await User.bulkCreate(userData,{
        individualHooks: true
    });

    console.table(dbUsers.map(user=>user.toJSON()));

    const dbPosts = await Post.bulkCreate(postData);
    console.table(dbPosts.map(post=>post.toJSON()));

    const dbComment = await Comment.bulkCreate(commentData);
    console.table(dbComment.map(comment=>comment.toJSON()));

    process.exit(0);
}

seedMe();