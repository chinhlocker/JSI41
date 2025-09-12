// Import các hàm cần thiết từ Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    set,
    update,
    remove,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCR8YKypScBi9In2n4FIRa6yKkL94nyYPU",
    authDomain: "new-project-b9ae2.firebaseapp.com",
    projectId: "new-project-b9ae2",
    storageBucket: "new-project-b9ae2.firebasestorage.app",
    messagingSenderId: "877381900962",
    appId: "1:877381900962:web:b9b66d84a93bbbeef795fb",
    measurementId: "G-PNK3CX5YC5"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Khởi tạo dữ liệu mẫu
function initializeData() {
    const productsRef = ref(database, 'products');
    get(productsRef).then((snapshot) => {
        if (!snapshot.exists()) {
            initialProducts.forEach(product => {
                push(productsRef, product);
            });
        }
    });
}

// Hiển thị sản phẩm
function displayProduct(id, product) {
    const productGrid = document.getElementById('productGrid');
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-price">${product.price.toLocaleString('vi-VN')} đ</p>
        <p class="product-category">${product.category}</p>
        <p class="product-description">${product.description}</p>
        <div class="button-group">
            <button class="btn btn-update" onclick="updateProduct('${id}')">Cập nhật</button>
            <button class="btn btn-delete" onclick="deleteProduct('${id}')">Xóa</button>
        </div>
    `;
    productGrid.appendChild(productCard);
}

// Lắng nghe sự thay đổi dữ liệu và cập nhật giao diện
function loadProducts() {
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = '';
        
        snapshot.forEach((childSnapshot) => {
            const id = childSnapshot.key;
            const product = childSnapshot.val();
            displayProduct(id, product);
        });
    });
}

// Xóa sản phẩm
window.deleteProduct = function(id) {
    const productRef = ref(database, `products/${id}`);
        remove(productRef).then(() => {
            alert('Đã xóa sản phẩm thành công!');
        })
}

// Hiển thị form cập nhật với thông tin sản phẩm
window.updateProduct = function(id) {
    const productRef = ref(database, `products/${id}`);
    get(productRef).then((snapshot) => {
        if (snapshot.exists()) {
            const product = snapshot.val();
            document.getElementById('productId').value = id;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('category').value = product.category;
            document.getElementById('description').value = product.description;
            document.getElementById('image').value = product.image;
            
            document.getElementById('updateForm').classList.remove('hidden');
        }
    });
}

// Xử lý sự kiện submit form cập nhật
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const updatedProduct = {
        name: document.getElementById('name').value,
        price: Number(document.getElementById('price').value),
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };

    const productRef = ref(database, `products/${id}`);
    update(productRef, updatedProduct).then(() => {
        alert('Cập nhật sản phẩm thành công!');
        document.getElementById('updateForm').classList.add('hidden');
        document.getElementById('editForm').reset();
    })
});

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadProducts();
});
