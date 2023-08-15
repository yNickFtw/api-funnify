import { IPostRepository } from "../../types/interfaces";
import { IPost } from "../../types/post.interface";
import { Post } from "../entities/Post";
import { User } from "../../../users/sequelize/entities/User";

export default class PostRepository implements IPostRepository {
  public async create({
    title,
    imageUrl,
    imageFilename,
    videoUrl,
    videoFilename,
    userId,
  }: Partial<IPost>): Promise<void> {
    const post: Partial<IPost> = {
      title,
      imageUrl,
      imageFilename,
      videoUrl,
      videoFilename,
      userId,
    };

    await Post.create({ ...post });

    return;
  }

  public async findById(postId: number): Promise<IPost | undefined> {
    const post = await Post.findOne({ where: { id: postId } });

    return post as unknown as IPost;
  }

  public async findAll(): Promise<IPost[]> {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "password",
              "email",
              "createdAt",
              "updatedAt",
              "bio",
              "profileImageFilename",
            ],
          },
        },
      ],
    });

    return posts as unknown as IPost[];
  }
}
