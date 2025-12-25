import prisma from '../utils/client'
import type { Barang } from '../../generated/prisma/client'

export const getBarang = async (): Promise<Barang[]> => {
  const data = await prisma.barang.findMany()

  return data
}
