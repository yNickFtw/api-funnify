import { Comment } from "../entities/Comment";
import { User } from "../../../users/sequelize/entities/User";
import { ICommentRepository } from "../../types/interfaces";
import { IComment } from "../../types/comment.interface";

export default class CommentRepository implements ICommentRepository {
  public async create({ content, userId, postId }: Partial<IComment>): Promise<void> {
    await Comment.create({ ...{ content, userId, postId } })
    
    return
  }
  
  public async findAllByPostId(postId: number): Promise<IComment[]> {
    const comments = await Comment.findAll({ where: { postId: postId } })

    return comments as unknown as IComment[]
  }
}