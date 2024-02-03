const User = require("./User");
const Post = require("./Post");
const Comment = require("/Comment")

User.hasMany(Post, {
    foreignKey: "userid", 
    onDelete: 'CASCADE',
  });

  User.hasMany(Comment, {
    foreignKey: "userid",
    onDelete: 'CASCADE',
  });

  Post.belongsTo(User, {
    foreignKey: "userid", 
  });

  Post.hasMany(Comment, {
    foreignKey: "postid",
  });
  
  Comment.belongsTo(User, {
    foreignKey: "userid",
  });
  
  Comment.belongsTo(Post, {
    foreignKey: "postid", 
  });
  
  module.exports = { User, Post, Comment };