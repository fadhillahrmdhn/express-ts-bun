import prisma from '../utils/client'
import type { Barang } from '../../generated/prisma/client'
import type BarangType from '../types/BarangType'

export const getBarang = async (): Promise<Barang[]> => {
  const data = await prisma.barang.findMany()

  return data
}

export const getBarangById = async (id: number): Promise<Barang | null> => {
  const data = await prisma.barang.findUnique({
    where: { id }
  })

  return data
}

export const insertBarang = async (Payload: BarangType): Promise<Barang> => {
  const data = await prisma.barang.create({
    data: Payload
  })

  return data
}

export const updateBarang = async (
  Payload: BarangType
): Promise<Barang | null> => {
  const { id, ...dataToUpdate } = Payload
  const data = await prisma.barang.update({
    where: { id },
    data: dataToUpdate
  })

  return data
}

export const deleteBarang = async (id: number): Promise<Barang | null> => {
  //Setelah berhasil dihapus, Prisma akan mengembalikan objek data yang baru saja dihapus tersebut. Ini berguna jika Anda ingin menampilkan informasi barang apa yang telah dihapus kepada user.
  const data = await prisma.barang.delete({
    where: { id }
  })

  return data
}
