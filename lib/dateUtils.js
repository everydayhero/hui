import moment from 'moment'

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const ordinal = (d) => {
  const nth = { '1': 'st', '2': 'nd', '3': 'rd' }
  return `${d}${nth[d] || 'th'}`
}

const secondsPerPeriod = {
  year: 31536000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const dateString = (date) => `${ordinal(date.getDate())} ${monthNames[date.getMonth()]}`

const timeScale = (seconds, period) => Math.floor(seconds / secondsPerPeriod[period])

export const formattedDate = (date) => {
  const d = date || moment()
  return d.format('YYYY-MM-DD')
}

export const humanizedRecentDate = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)
  const days = timeScale(seconds, 'day')
  if (days < 1)
    return 'today'
  if (days === 1)
    return 'yesterday'
  if (days > 1 && days <= 5)
    return 'on ' + dayNames[date.getDay()]
  if (days > 5 && days < 9)
    return 'last ' + dayNames[date.getDay()]
  return 'on ' + dateString(date)
}
