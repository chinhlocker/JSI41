const numbers = [6, 89, 90, 23, 5, 9];

let sum = 0;
for (let i in numbers) {
    sum += numbers[i];
}

console.log(sum);

let evenNumbers = [];
let oddNumbers = [];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evenNumbers.push(numbers[i]);
    } else {
        oddNumbers.push(numbers[i]);
    }
}

console.log(evenNumbers);
console.log(oddNumbers);

const sumExpression = numbers.join(" + ") + " = " + sum;

console.log(sumExpression);