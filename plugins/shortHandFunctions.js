import moment from 'moment-timezone'
export default (context, inject) => {
  // Moment js
  inject('moment', moment)

  // copy object for prevent mutation error
  const copy = (obj) => JSON.parse(JSON.stringify(obj))
  inject('copy', copy)
}
