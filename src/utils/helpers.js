// 👉 copy array
export const copyArray = arr => {
  return JSON.parse(JSON.stringify(arr))
}

// 👉 IsEmpty
export const isEmpty = value => {
  if (value === null || value === undefined || value === '')
    return true
  
  return !!(Array.isArray(value) && value.length === 0)
}
  
// 👉 IsEmptyArray
export const isEmptyArray = arr => {
  return Array.isArray(arr) && arr.length === 0
}
  
// 👉 IsObject
export const isObject = obj => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsFileAccept
export const isFileAccept = value => {
  if (value.length === 0) {
    return null
  }
  
  const mimeMap = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'pdf': 'application/pdf'
  }
  
  return value
    .map(ext => mimeMap[ext])
    .filter(Boolean)
    .join(', ')
}

// 👉 handleLocalPhoneNumberKeypress
export const handleLocalPhoneNumberKeypress = (event) => {
  const key = event.key
  const target = event.target
  const cursorPosition = target.selectionStart || 0
  
  // Allow control keys (Backspace, Delete, Tab, Arrow keys, etc.) - they have length > 1
  if (key.length > 1) {
    return
  }
  
  // If '+' is pressed, only allow it at the front (position 0)
  if (key === '+') {
    if (cursorPosition !== 0) {
      event.preventDefault()
      return
    }
  }
  
  // Only allow digits and '+' (but '+' is already handled above)
  if (!/[0-9+]/.test(key)) {
    event.preventDefault()
  }
}