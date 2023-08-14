import { IUserRepository } from "../../types/interfaces";
import { IUser } from "../../types/user.interface";
import { User } from "../entities/User";

export default class UserRepository implements IUserRepository {
  public async create({ username, email, password }: Partial<IUser>): Promise<void> {
    const newUser: Partial<IUser> = { username, email, password }

    await User.create({...newUser})

    return
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await User.findOne({ where: { email: email } })

    return user as unknown as IUser
  }

  public async findByUsername(username: string): Promise<IUser | undefined> {
    const user = await User.findOne({ where: { username: username } })
    
    return user as unknown as IUser
  }

  public async findById(userId: number): Promise<IUser | undefined> {
    const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ["password"] } })

    return user as unknown as IUser
  }

}
