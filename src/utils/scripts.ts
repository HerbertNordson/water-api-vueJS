export const formatedHour = (date: string) => {
  const regexValidateDate = /(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})\s(\d{1}|\d{2})(:)(\d{2})/g
  if (regexValidateDate.test(date)) {
    const regex = /(\d{4})(-|\/)(\d{2})(-|\/)(\d{2}) /g
    return date.replace(regex, '')
  }

  return ""
}

export const formatedDate = (date: string) => {
  const regexValidateDate = /(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})?[\s(\d{2})(:)(\d{2})]/g
  if (regexValidateDate.test(date)) {
    const removeHour = date.replace(/\s(\d{2})(:)(\d{2})/g, '')
    const year = removeHour.replace(/(-|\/)(\d{2})(-|\/)(\d{2})/g, '')
    let middle = removeHour.replace(/(\d{4})(-|\/)/g, '')
    const month = middle.replace(/(-|\/)(\d{2})/g, '')
    const day = removeHour.replace(/(\d{4})(-|\/)(\d{2})(-|\/)/g, '')
    const dateFormated = `${day}/${month}/${year}`
    return dateFormated
  }

  return ""
}
