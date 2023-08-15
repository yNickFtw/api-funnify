import { ILikeRepository } from "../../types/interfaces";
import { Like } from "../entities/Like";

export default class LikeRepository implements ILikeRepository {
  public async addLike(userId: number, postId: number): Promise<void> {
    await Like.create({...{ userId, postId }})
    
    return
  }

  public async removeLike(userId: number, postId: number): Promise<void> {
    await Like.destroy({ where: { userId: userId, postId: postId } })
    
    return
  }

  public async listAllLikesId(userId: number): Promise<[{ postId: number }]> {
    const likes = await Like.findAll({ where: { userId: userId }, attributes: ["postId"] })

    return likes as unknown as [{ postId: number }]
  }

}
