import jwt from 'jsonwebtoken'

import {
  User
} from '~/src/app/models/User/Model'

const generateToken = (userId) => {
  return jwt.sign({
    userId
  }, process.env.JWT_SECRET, {
    expiresIn: '7 days'
  })
}

const decodeToken = async (token) => {
  if (token) {
    token = token.replace('Bearer ', '')
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User
        .query()
        .where('id', decoded.userId)
        .first()

      if (user) {
        return user
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }
}

export {
  generateToken,
  decodeToken
}
