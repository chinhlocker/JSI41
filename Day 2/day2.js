// let a = "hello"
// let chuHoa = a.toUpperCase()

// console.log(chuHoa);
let inputText = document.getElementById("inputText")
let convertButton = document.getElementById("convertButton")
let resultText = document.getElementById("resultText")
let emptyString = []
convertButton.addEventListener("click", function() {
    console.log(inputText.value.toUpperCase());
    // resultText.innerText = inputText.value.toUpperCase()
    let div = document.createElement("div") // Tạo 1 thẻ div
    div.innerText = inputText.value.toUpperCase() // Gán chữ chữ viết hoà vào thẻ div
    resultText.appendChild(div) // Thêm div vào thẻ resultText
    emptyString.push(inputText.value.toUpperCase()) // Thêm vào mảng
    
    // Lấy ra dữ liệu hiện tại ở localStorage
    let textFromLocalStorage = JSON.parse(localStorage.getItem("listText")) || []
    if (textFromLocalStorage === null) {
        textFromLocalStorage = []
    }
    
    textFromLocalStorage.push(inputText.value.toUpperCase())

    // Xử lý lưu vào localStorage
    localStorage.setItem("listText", JSON.stringify(textFromLocalStorage))
    // localStorage.setItem("listText", JSON.stringify(emptyString));
    
    inputText.value = "" // clear value
})
// ["ASDASD", "DFVDFV", "ADASDASD"]

// Lưu vào localStorage
// localStorage.setItem("key", "value")
// key và value dữ liệu phải là string
localStorage.setItem("name", "Phuong")
localStorage.setItem("age", "100")
let array = [1, 2, 3]
console.log(array); // array
// array = JSON.stringify(array)
// console.log(array[0]); // string
// let value = "Phuong"
// console.log(value[0]);
// let a = 10
// a = a + 100
// key = "arrayNumber"
// JSON.stringify(value): Chuyển 'value' từ dạng object/array -> string object/string array
localStorage.setItem("arrayNumber", JSON.stringify(array))

// Lấy dữ liệu từ localStorage: localStorage.getItem("key")

let arrayNumber = JSON.parse(localStorage.getItem("arrayNumber"))
console.log(arrayNumber);
// JSON.parse(value): Biến dữ liệu object/array từ dạng string -> dạng object/array dạng bình thường

console.log(arrayNumber);

document.getElementById("goNewPage").addEventListener("click", function() {
    window.location.href = "newpage.html";
});