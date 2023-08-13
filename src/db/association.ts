import { Post } from "../modules/posts/sequelize/entities/Post";
import { User } from "../modules/users/sequelize/entities/User";


class AssociationConfig {
  public init(cb: Function) {
    User.hasMany(Post)
    Post.belongsTo(User)

    cb()
  }
}

export default new AssociationConfig();
