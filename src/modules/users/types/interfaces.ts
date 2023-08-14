import { IUser } from "./user.interface";

// @Repository Interfaces
export interface IUserRepository {
  create: ({ username, email, password }: Partial<IUser>) => Promise<void>
  findByEmail: (email: string) => Promise<IUser | undefined>
  findByUsername: (username: string) => Promise<IUser | undefined>
  findById: (userId: number) => Promise<IUser | undefined>
}
