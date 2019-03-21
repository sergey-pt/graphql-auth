import passwordValidator from 'password-validator'
import validator from 'validator'
import _ from 'lodash'

import {
  User
} from '~/src/app/models/User/Model'

const passwordSchema = new passwordValidator()

passwordSchema
  .is().min(8)
  .is().max(64)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()

const passwordErrorsMessages = {
  min: 'Password should be at least 8 charachters long',
  max: 'Password should be be a maximum of 64 characters long',
  uppercase: 'Password should have uppercase characters',
  lowercase: 'Password should have lowercase characters',
  digits: 'Password should contain digits',
  spaces: 'Password should not contain spaces',
  blank: 'Password should not be blank'
}

const emailErrorsMessages = {
  blank: 'Email should not be blank',
  invalid: 'Email should have a valid format',
  unique: 'Email have been already taken'
}

const userValidate = async ({
  instance,
  old,
  operation
}) => {
  let errors = []

  const passwordErrors = validatePassword({
    instance,
    allowToSkip: !(operation === 'insert')
  })
  const emailErrors = await validateEmail({
    instance,
    old
  })

  errors.push(...passwordErrors, ...emailErrors)

  return errors
}

const validatePassword = ({
  instance,
  allowToSkip
}) => {
  if (!instance.password) {
    if (allowToSkip) {
      return []
    } else {
      return [{
        key: 'password',
        keyword: 'missing',
        message: passwordErrorsMessages['blank']
      }]
    }
  }

  const passwordErrors = passwordSchema.validate(instance.password, {
    list: true
  })

  if (Array.isArray(passwordErrors) && passwordErrors.length) {
    return passwordErrors.map((error) => {
      return {
        key: 'password',
        keyword: error,
        message: passwordErrorsMessages[error]
      }
    })
  } else {
    return []
  }
}

const validateEmail = async ({
  instance,
  old
}) => {
  let emailErrors = []

  if (!instance.email && !old) {
    return [{
      key: 'email',
      keyword: 'missing',
      message: emailErrorsMessages['blank']
    }]
  } else if (!instance.email && old) {
    return []
  } else {
    if (!validator.isEmail(instance.email)) {
      emailErrors.push({
        key: 'email',
        keyword: 'invalid',
        message: 'Email should have a valid format'
      })
    }

    const user = await User
      .query()
      .skipUndefined()
      .where('email', instance.email)
      .whereNot('id', _.get(old, 'id', undefined))
      .first()

    if (user) {
      emailErrors.push({
        key: 'email',
        keyword: 'unique',
        message: 'Email have been already taken'
      })
    }
  }

  return emailErrors
}

export default userValidate
