// Import the functions you need from the SDKs you need
import {
  get,
  getDatabase,
  set,
  ref,
  onValue,
  update,
  remove,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR8YKypScBi9In2n4FIRa6yKkL94nyYPU",
  authDomain: "new-project-b9ae2.firebaseapp.com",
  projectId: "new-project-b9ae2",
  storageBucket: "new-project-b9ae2.firebasestorage.app",
  messagingSenderId: "877381900962",
  appId: "1:877381900962:web:b9b66d84a93bbbeef795fb",
  measurementId: "G-PNK3CX5YC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let productName = document.getElementById("productName")
let productPrice = document.getElementById("productPrice")
let productImg = document.getElementById("productImg")
let productDescribe = document.getElementById("productDescribe")
let addBtn = document.getElementById("addBtn")

addBtn.addEventListener("click", function() {
    let productId = window.uuidv4();
    set(ref(database, "products/" + productId), {
        id: productId,
        name: productName.value,
        price: productPrice.value,
        image: productImg.value,
        describe: productDescribe.value
    })
    alert("Add thành công")
})

let container_product = document.querySelector(".container_product");
let getAllBtn = document.getElementById("GetAllBtn");

getAllBtn.addEventListener("click", function() {
    get(ref(database, "products/"))
    .then((snapShot) => {
        if (snapShot.exists()) {
            let products = Object.values(snapShot.val());
            container_product.innerHTML = "";
            products.forEach((product) => {
                let card_item = document.createElement("div");
                card_item.className = "product_item";
                card_item.innerHTML = `
                    <a href="${product.image}" target="_blank">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <h3>${product.name}</h3>
                    <p>Giá: ${product.price}</p>
                    <p>${product.describe}</p>
                    <button>Thêm vào giỏ hàng</button>
                `;
                container_product.appendChild(card_item);
            });
        }
    })
})