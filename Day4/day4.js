let container = document.querySelector(".container");
fetch("https://jsonplaceholder.typicode.com/albums") // Gọi API
  .then(function (response) {
    return response.json();
  }) // Xử lý dữ liệu trả về
  .then(function (data) {
    // Dữ liệu trả về ở dạng mảng và bên trong mảng thì có nhiều object
    for (let i = 0; i < 5; i++) {
      let div_content = document.createElement("div");
      div_content.className = "content";
      div_content.innerHTML = `
            <p class="ID_Number">ID: ${data[i].id}</p>
            <h2 class="Title">${data[i].title}</h2>
            <button class="save">Save</button>
            `;
        container.appendChild(div_content)
    }
  }); // In ra dũ liệu trả về ở console