import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/client'
import { generateRefreshToken } from '../utils/jwt'
import bcrypt from 'bcrypt'

const getRefreshToken = (): string => {
  const usr = {
    // kenapa ini berhasil padahal di const getRefreshToken saya definisikan password "xxxxx" yang bukan password asli user.
    // Hal ini terjadi karena endpoint /api/refresh tidak melakukan verifikasi password. Endpoint ini hanya memverifikasi tanda tangan (signature) JWT dan memastikan user masih ada di database.
    user_id: '9e37cd28-eed2-4a5b-9549-1a70eafc6ba4',
    email: '@stella.com',
    nama: 'Stella',
    password: 'xxxxxx',
    role: 'regular',
    created_at: Date.now(),
    updated_at: Date.now()
  }
  return generateRefreshToken(usr)
}

describe('User', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        email: '@stella.com',
        nama: 'Stella',
        password: await bcrypt.hash('12345', 10),
        role: 'regular'
      }
    })
  })

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: '@stella.com' } })
  })

  it('user login data valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: '@stella.com',
      password: '12345'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Login user berhasil')
  })

  it('user login email tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: '@juun.com',
      password: '12345'
    })
    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Login gagal')
  })

  it('user login password tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: '@jiwoo.com',
      password: '123'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Login gagal')
  })

  //   afterEach(async () => {
  //   await prisma.user.deleteMany({
  //     where: {
  //       email: '@ana.com'
  //     }
  //   })
  // })
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: '@ana.com'
      }
    })
  })
  it('register user data valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      nama: 'Ana',
      email: '@ana.com',
      password: '12345',
      confirmPassword: '12345'
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Registrasi user berhasil')
  })

  it('register user data tidak valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      nama: 'Ana',
      email: '@ana.com',
      password: '12345',
      confirmPassword: '1234567'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Validasi input user gagal')
  })

  it('refresh token valid', async () => {
    const response = await supertest(web)
      .get('/api/refresh')
      .set('Authorization', `Bearer ${getRefreshToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Refresh token berhasil')
  })
  it('refresh token tidak valid', async () => {
    const response = await supertest(web)
      .get('/api/refresh')
      .set('Authorization', `Bearer xxxxxx`)
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Refresh token gagal')
  })
})
