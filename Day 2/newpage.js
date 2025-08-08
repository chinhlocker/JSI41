let listText = JSON.parse(localStorage.getItem("listText")) || [];
let listContainer = document.getElementById("listContainer");

listText.forEach(function (item) {
    let li = document.createElement("li");
    li.textContent = item;
    listContainer.appendChild(li);
});