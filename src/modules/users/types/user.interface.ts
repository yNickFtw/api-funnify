export interface IUser {
  id?: number | undefined;
  username: string;
  email: string;
  password: string | undefined;
  bio?: string | undefined;
  profileImage?: string | null;
  profileImageFilename?: string | null;
}
