const moment = require('moment')

const now = moment().format("DD-MM-YYYY");
const date = moment().format("MMM Do YY");
const day = moment().format("dddd");

console.log(now);
console.log(date);
console.log(day);