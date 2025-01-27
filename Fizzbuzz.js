const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question(`Please input your number : `, number => {
    let result =''
    if(number%3===0){
        result+= 'Fizz'
    }
    if(number%5===0){
        result+= 'Buzz'
    }
    if(!result){
        result = number
    }
    console.log(`You mean ${result}?`);
    rl.close();
});