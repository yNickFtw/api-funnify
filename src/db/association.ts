import { Like } from "../modules/likes/sequelize/entities/Like";
import { Post } from "../modules/posts/sequelize/entities/Post";
import { User } from "../modules/users/sequelize/entities/User";

class AssociationConfig {
  public init(cb: Function) {
    User.hasMany(Post)
    Post.belongsTo(User)

    User.hasMany(Like)
    Like.belongsTo(User)

    Post.hasMany(Like)
    Like.belongsTo(Post)

    cb()
  }
}

export default new AssociationConfig();
