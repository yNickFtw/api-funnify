import { IPost } from "./post.interface";

export interface IPostRepository {
  create: ({ title }: Partial<IPost>) => Promise<void>
}