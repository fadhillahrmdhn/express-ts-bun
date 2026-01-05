import type UserType from '../types/user.type'
import prisma from '../utils/client'

export const createUser = async (payload: UserType): Promise<UserType> => {
  const newUser = await prisma.user.create({
    data: {
      ...payload
    }
  })
  return newUser
}

export const userLogin = async (
  payload: UserType
): Promise<UserType | null> => {
  const data = await prisma.user.findFirst({
    where: {
      email: payload.email
    }
  })
  return data
}
