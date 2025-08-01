function addInfo() {
    const input = document.getElementById("userInput").value;
    if (input.trim() === "") return;

    const newDiv = document.createElement("div");
    newDiv.textContent = input;
    document.getElementById("resultArea").appendChild(newDiv);

    document.getElementById("userInput").value = ""; 
}