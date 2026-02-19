// 👉 set currency digits
export const setCurrencyDigits = value => {
  if(!value || value == '0.00'){
    return 0
  }
  
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// 👉 set currency digits with Rp
export const setCurrencyDigitsWithRp = value => {
  return `Rp ${setCurrencyDigits(value)}`
}

// 👉 set UTC date
export const setUTCDate = value => {
  if (value) {
    const utcDate = new Date(Date.UTC(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    ))

    return utcDate
  }

  return null
}

// 👉 get initials
export const getInitials = (name) => {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('')
}
  