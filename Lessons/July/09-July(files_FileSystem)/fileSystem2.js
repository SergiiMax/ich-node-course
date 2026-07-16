const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
if (err) {
console.error(err)
return
}
console.log(data)

fs.writeFile('output2.txt', data, (err => {
if (err) {
console.error(err)
return
}
console.log('File was written')
}))

console.log('work complete')
})