import { Like } from "../modules/likes/sequelize/entities/Like";
import { Post } from "../modules/posts/sequelize/entities/Post";
import { User } from "../modules/users/sequelize/entities/User";
import { Comment } from "../modules/comments/sequelize/entities/Comment";
import { LikeComment } from "../modules/comments/sequelize/entities/LikeComment";

class AssociationConfig {
  public init(cb: Function) {
    User.hasMany(Post)
    Post.belongsTo(User)

    User.hasMany(Like)
    Like.belongsTo(User)

    Post.hasMany(Like)
    Like.belongsTo(Post)

    User.hasMany(Comment)
    Comment.belongsTo(User)

    Post.hasMany(Comment)
    Comment.belongsTo(Post)

    User.hasMany(LikeComment)
    LikeComment.belongsTo(User)

    Comment.hasMany(LikeComment)
    LikeComment.belongsTo(Comment)
    
    cb()
  }
}

export default new AssociationConfig();
