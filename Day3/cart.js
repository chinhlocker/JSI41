function displayCart() {
    const cartContainer = document.querySelector('.container_product');
    const totalElement = document.getElementById('total');
    
    // Lấy giỏ hàng từ localStorage
    const cartJSON = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(cartJSON);
    

    
    // Hiển thị sản phẩm
    cartContainer.innerHTML = cart.map((product, index) => `
        <div class="product_item">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Giá: ${Number(product.price).toLocaleString()} đ</p>
            <p>Danh mục: ${product.category}</p>
            <button class="remove-btn" onclick="removeFromCart(${index})">Xóa khỏi giỏ hàng</button>
        </div>
    `).join('');
}

function removeFromCart(index) {
    // Lấy giỏ hàng hiện tại
    const cartJSON = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(cartJSON);
    
    // Xóa sản phẩm tại vị trí index
    cart.splice(index, 1);
    
    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Hiển thị lại giỏ hàng
    displayCart();
}

// Hiển thị giỏ hàng khi trang được tải
window.onload = displayCart;
