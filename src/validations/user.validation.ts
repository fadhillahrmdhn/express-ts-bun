import type UserType from '../types/user.type'
import Joi from 'joi'

export const inputUserValidation = (
  payload: UserType
): Joi.ValidationResult<UserType> => {
  const schema = Joi.object<UserType>({
    user_id: Joi.string().trim().allow(null, ''),
    email: Joi.string().trim().required().messages({
      'string.base': 'email harus berupa string',
      'string.empty': 'email tidak boleh kosong',
      'string.email': 'email harus berupa email yang valid',
      'any.required': 'email harus diisi'
    }),
    nama: Joi.string().trim().required().messages({
      'string.base': 'nama harus berupa string',
      'string.empty': 'nama tidak boleh kosong',
      'any.required': 'nama harus diisi'
    }),
    password: Joi.string().min(3).max(15).trim().required().messages({
      'string.base': 'password harus berupa string',
      'string.empty': 'password tidak boleh kosong',
      'string.min': 'password harus lebih dari 3 karakter',
      'string.max': 'password harus kurang dari 15 karakter',
      'any.required': 'password harus diisi'
    }),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('confirmPassword')
      .messages({
        'any.only': '{{#label}} tidak sesuai dengan password',
        'any.required': '{{#label}} harus diisi'
      }),
    role: Joi.string().trim().allow(null, '')
  }).required()

  return schema.validate(payload)
}
