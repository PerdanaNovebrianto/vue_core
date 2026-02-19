import { isEmpty } from '@/utils/helpers'

// 👉 local phone-number validator
export const localPhoneNumberValidator = value => {
  if (isEmpty(value))
    return true
  
  const strValue = String(value)
  // Ensure + can only appear once at the front (if present)
  // Valid formats: +62... or 0...
  // Check prefix pattern and ensure no + symbols after the first character
  return /^(\+62|0)/.test(strValue) && !strValue.slice(1).includes('+')
}

// 👉 file extension validator
export const fileExtensionValidator = (value, extension) => {
  if (isEmpty(value))
    return true
  
  const fileExt = value.type.split('/')[1]
  
  return extension.some(ext => {
    if (ext === 'jpg' || ext === 'jpeg') {
      return ['jpg', 'jpeg'].includes(fileExt)
    }
    return ext === fileExt
  })
}

// 👉 file size validator
export const fileSizeValidator = (value, size) => {
  if (isEmpty(value))
    return true

  const maxSizeInBytes = (size / 1000) * 1024 * 1024

  return value.size < maxSizeInBytes
}

// 👉 password pattern validator
export const passwordPatternValidator = (value) => {
  if (isEmpty(value)) return true

  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /\d/.test(value)

  return hasUpperCase && hasLowerCase && hasNumber
}

// 👉 same value validator
export const sameValueValidator = (otherValue) => {
  return (value) => {
    if (isEmpty(value) || isEmpty(otherValue)) return true
    
    return value === otherValue
  }
}