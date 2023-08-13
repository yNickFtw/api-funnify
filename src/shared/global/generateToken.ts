require('dotenv').config()
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || ""

export interface IResponseJWT {
  token: string;
  userId: number;
}

export async function generateTokenJWT(temp: string, userId: number): Promise<IResponseJWT> {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: temp
  })

  return { token, userId }
}