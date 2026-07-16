const fs = require('fs')
const student = 'name: Sergii, surname: Maksymenko, age: 40, group: 281125-wdm'
    

fs.writeFile('student.txt', student, (err) => {
    if(err) {
        console.log("error occured:", err);
    return;
    }
    fs.readFile("student.txt", 'utf8', (err, data) => {
        if(err) {
            console.log("error occured:", err);
    return;
        }
        console.log('Students info:', data);
        fs.unlink('student.txt', (err) => {
            if(err) {
                console.log("error occured:", err);
    return;
            }
            console.log("File has been deleted");
            
        })
    })
})