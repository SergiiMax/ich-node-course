import User from "./User.js";
import Comment from "./Comment.js";

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "comments",   
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",         
});

export { User, Comment };
