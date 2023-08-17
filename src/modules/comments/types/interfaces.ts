import { IComment } from "./comment.interface";

export interface ICommentRepository {
  create: ({ content, userId, postId }: Partial<IComment>) => Promise<void>;
  findAllByPostId: (postId: number) => Promise<IComment[]>;
}