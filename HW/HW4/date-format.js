import moment from 'moment'

const now = moment().format('MMMM Do YYYY, h:mm:ss a')
const date = moment().format("MMM Do YY")
const day = moment().format('dddd')

console.log(now);
console.log(date);
console.log(day);