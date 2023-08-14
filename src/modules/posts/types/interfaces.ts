import { IPost } from "./post.interface";

export interface IPostRepository {
  create: ({ title, imageUrl, imageFilename, videoUrl, videoFilename, userId }: Partial<IPost>) => Promise<void>;
  findById: (postId: number) => Promise<IPost | undefined>
  findAll: () => Promise<IPost[]>
}