import supertest from 'supertest'
import { generateAccessToken } from '../utils/jwt'
import web from '../middleware/web'
import prisma from '../utils/client'

const getToken = (): string => {
  const usr = {
    user_id: '9e37cd28-eed2-4a5b-9549-1a70eafc6ba4',
    email: '@yuha.com',
    nama: 'Yuha',
    password: 'xxxxxx',
    role: 'regular',
    created_at: Date.now(),
    updated_at: Date.now()
  }
  return generateAccessToken(usr)
}

describe('barang', () => {
  it('ambil semua data barang dengan token valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .get('/api/barang')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(response.body.message).toEqual(
      'Pengambilan semua data barang berhasil'
    )
  })
  it('gagal ambil semua data barang tanpa token', async () => {
    const response = await supertest(web).get('/api/barang')
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('verifikasi token gagal')
  })
  it('ambil data barang berdasarkan id dengan token valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .get('/api/barang/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.id).toEqual(1)
    expect(response.body.message).toEqual('Pengambilan data barang berhasil')
  })
  it('gagal ambil data barang berdasarkan id tanpa token', async () => {
    const response = await supertest(web).get('/api/barang/1')
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('verifikasi token gagal')
  })
  it('input data barang dengan token valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .post('/api/barang')
      .send({
        nama: 'Barang Test',
        jumlah: '10',
        harga: '50000'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('input barang berhasil')
  })
  it('gagal input data barang tanpa token', async () => {
    const response = await supertest(web).post('/api/barang').send({
      nama: 'Barang Test',
      jumlah: '10',
      harga: '50000'
    })
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('verifikasi token gagal')
  })
  it('update data barang dengan token valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .put('/api/barang/1')
      .send({
        nama: 'Barang Test Update 2'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('update barang berhasil')
  })
  it('gagal update data barang tanpa token', async () => {
    const response = await supertest(web).put('/api/barang/1').send({
      nama: 'Barang Test Update 1',
      jumlah: '10',
      harga: '50000'
    })
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual('verifikasi token gagal')
  })
  it('gagal update data barang dengan data tidak valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .put('/api/barang/1')
      .send({
        nama: 'Barang Test Update 1',
        jumlah: '',
        harga: ''
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('update barang gagal')
  })
  it('delete data barang dengan token valid', async () => {
    const token = getToken()
    const response = await supertest(web)
      .delete('/api/barang/22')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('delete barang berhasil')
  })

  afterAll(async () => {
    await prisma.barang.deleteMany({
      where: {
        nama: 'Barang Test'
      }
    })
  })
})
