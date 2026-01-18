import joi from 'joi'
import type BarangType from '../types/BarangType.js'

export const updateBarangValidation = (
  payload: BarangType
): joi.ValidationResult<BarangType> => {
  const schema = joi
    .object<BarangType>({
      nama: joi.string().trim().required().messages({
        'string.base': 'nama harus berupa string',
        'string.empty': 'nama tidak boleh kosong',
        'any.required': 'nama harus diisi'
      }),
      jumlah: joi.number().required().messages({
        'number.base': 'jumlah harus berupa angka',
        'number.empty': 'jumlah tidak boleh kosong',
        'any.required': 'jumlah harus diisi'
      }),
      harga: joi.number().required().messages({
        'number.base': 'harga harus berupa angka',
        'number.empty': 'harga tidak boleh kosong',
        'any.required': 'harga harus diisi'
      })
    })
    .required()

  //return schema.validate(payload, { abortEarly: false })
  return schema.validate(payload)
}
