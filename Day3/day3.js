const products = [
  {
    id: 1,
    name: "Áo Thun Nam Cotton",
    price: 199000,
    category: "Thời trang",
    description: "Áo thun nam chất liệu cotton mềm mại, thoáng mát.",
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "Giày Thể Thao Unisex",
    price: 450000,
    category: "Giày dép",
    description: "Giày thể thao unisex phong cách trẻ trung, năng động.",
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "Tai Nghe Bluetooth",
    price: 350000,
    category: "Điện tử",
    description: "Tai nghe Bluetooth âm thanh sống động, pin lâu.",
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    name: "Túi Xách Da Nữ",
    price: 599000,
    category: "Phụ kiện",
    description: "Túi xách da nữ sang trọng, phù hợp mọi dịp.",
    image: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 5,
    name: "Bình Giữ Nhiệt 500ml",
    price: 150000,
    category: "Gia dụng",
    description: "Bình giữ nhiệt 500ml giữ nóng/lạnh lên đến 12 giờ.",
    image: "https://picsum.photos/300/200?random=5",
  },
];

localStorage.setItem("products", JSON.stringify(products))

// console.log(products[0]);
// console.log(products[1]);
// console.log(products[2]);
// console.log(products[3]);
// console.log(products[4]);

// for (let i = 0; i < products.length; i++) {
//    console.log(products[i]);
// }

let text = ["a12123", "b", "c", "d"];
// for(let i = 0 ;i < text.length; i++) {
//     console.log(text[i]);
// }

// forEach là 1 hàm của mảng cho phép người dùng truy cập vào các phần tử nằm trong mảng đấy
// mảng.forEach((value) => {}) # value là các phần tử nằm trong "mảng"

// let container_product = document.getElementsByClassName("container_product")
let container_product = document.querySelector(".container_product"); // Luôn trả về 1 phần tử đầu tiên mà đọc được trong HTML
let search_btn = document.querySelector(".search_btn");
let product_name_search = document.getElementById("product_name_search");

// products.forEach((product) => {
//     let card_item = document.createElement("div")
//     card_item.className = "product_item"

//     let img = document.createElement("img")
//     img.src = product.image

//     let h3 = document.createElement("h3")
//     h3.innerText = product.name

//     // ...
//     card_item.appendChild(img)
//     card_item.appendChild(h3)

//     container_product.appendChild(card_item)
// })

products.forEach((product) => {
  let card_item = document.createElement("div");
  card_item.className = "product_item";
  card_item.innerHTML = `
        <img src="${product.image}" alt="Áo Thun Nam Cotton">
        <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
        <p>Giá: ${product.price}</p>
        <p>${product.category}</p>
        <button>Thêm vào giỏ hàng</button>
    `;
  container_product.appendChild(card_item);
});

let buttonCategory = document.getElementsByClassName("buttonCategory");
for (let i = 0; i < buttonCategory.length; i++) {
  buttonCategory[i].addEventListener("click", function () {
    console.log(buttonCategory[i].innerText);

    container_product.innerHTML = ""; // Xoá hết các sản phẩm hiện tại
    // container_product.innerHTML = buttonCategory[i].innerText
    products.forEach((product) => {
      if (product.category === buttonCategory[i].innerText) {
        let card_item = document.createElement("div");
        card_item.className = "product_item";
        card_item.innerHTML = `
          <img src="${product.image}" alt="Áo Thun Nam Cotton">
          <h3>${product.name}</h3>
          <p>Giá: ${product.price}</p>
          <p>${product.category}</p>
          <button>Thêm vào giỏ hàng</button>
      `;
        container_product.appendChild(card_item);
      }
    });
  });
}

search_btn.addEventListener("click", function () {
  container_product.innerHTML = ""; // Xoá hết các sản phẩm hiện tại
  products.forEach((product) => {
    if (product.name === product_name_search.value) {
      let card_item = document.createElement("div");
      card_item.className = "product_item";
      card_item.innerHTML = `
          <img src="${product.image}" alt="Áo Thun Nam Cotton">
          <h3>${product.name}</h3>
          <p>Giá: ${product.price}</p>
          <p>${product.category}</p>
          <button>Thêm vào giỏ hàng</button>
      `;
      container_product.appendChild(card_item);
    }
  });
});
