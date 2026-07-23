import Comment from "./comment.js";
import Post from "./post.js";

Post.hasMany(Comment, {foreignKey: "postId", onDelete: "CASCADE"})
Comment.belongsTo(Post, {foreignKey: "postId"})