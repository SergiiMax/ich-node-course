const moment = require('moment')

const m = moment();
const now = m.format("DD-MM-YYYY")
const date = m.format("MMM Do YY");
const day = m.format("dddd");

console.log(now);
console.log(date);
console.log(day);