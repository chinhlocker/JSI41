var url_string = window.location.href
var url = new URL(url_string)
var id = url.searchParams.get("id")

var productsJSON = localStorage.getItem("products")
var products = JSON.parse(productsJSON)

var product = 0

products.forEach(function(e) {
    if (e.id == id) {
        product = e
    }
});

document.querySelector(".product-image").src = `${product.image}`
document.querySelector(".product-name").textContent = `${product.name}`
document.querySelector(".product-description").textContent = `Giá: ${product.price}`
document.querySelector(".product-price").textContent = `${product.category}`

// Thêm sự kiện click cho nút Add to Cart
document.querySelector(".add-to-cart-btn").addEventListener("click", function() {
    // Lấy giỏ hàng hiện tại từ localStorage
    const cartJSON = localStorage.getItem('cart') || '[]'
    const cart = JSON.parse(cartJSON)
    
    // Thêm sản phẩm vào giỏ hàng
    cart.push(product)
    
    // Lưu giỏ hàng mới vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Thông báo cho người dùng
    alert('Đã thêm sản phẩm vào giỏ hàng!')
    
    // Chuyển đến trang giỏ hàng
    window.location.href = 'cart.html'
})

