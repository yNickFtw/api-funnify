export interface ILikeRepository {
  addLike: (userId: number, postId: number) => Promise<void>;
  removeLike: (userId: number, postId: number) => Promise<void>;
  listAllLikesId: (userId: number) => Promise<[{ postId: number }]>
}