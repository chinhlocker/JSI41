import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
        import {
            getDatabase,
            ref,
            push
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

        // Xử lý form tạo sản phẩm
        document.getElementById('createProductForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const newProduct = {
                name: document.getElementById('name').value,
                price: Number(document.getElementById('price').value),
                category: document.getElementById('category').value,
                description: document.getElementById('description').value,
                image: document.getElementById('image').value
            };

            // Thêm sản phẩm vào Firebase
            const productsRef = ref(database, 'products');
            push(productsRef, newProduct)
                .then(() => {
                    alert('Thêm sản phẩm thành công!');
                    window.location.href = 'products.html';
                })
        });