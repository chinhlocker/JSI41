// Lấy lịch sử tìm kiếm từ localStorage (nếu có) hoặc tạo mảng rỗng
let searchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];

// Hàm lấy tọa độ (lat, lon) từ tên thành phố
function getCoordinates(cityName) {
    return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`)
        .then(function(response) {
            return response.json(); // chuyển dữ liệu sang dạng JSON
        })
        .then(function(data) {
            if (data.results) {
                if (data.results.length > 0) {
                    let result = {};
                    result.lat = data.results[0].latitude;
                    result.lon = data.results[0].longitude;
                    result.name = data.results[0].name;
                    return result;
                }
            }
        })}

// Hàm lấy dữ liệu thời tiết từ lat, lon
function getWeather(lat, lon) {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data.current_weather; // chỉ lấy phần thời tiết hiện tại
        })
        .catch(function(error) {
            console.error("Lỗi khi lấy thời tiết:", error);
            return null;
        });
}

// Hàm đổi nền theo mã thời tiết (weather code)
function updateBackground(weatherCode) {
    const body = document.body;
    body.classList.remove("weather-sunny", "weather-rainy", "weather-storm");

    if (weatherCode >= 1 && weatherCode <= 5) {
        body.classList.add("weather-sunny");
    } else {
        if (weatherCode >= 51 && weatherCode <= 65) {
            body.classList.add("weather-rainy");
        } else {
            if (weatherCode > 65) {
                body.classList.add("weather-storm");
            }
        }
    }
}

// Hàm thêm 1 lần tìm kiếm vào lịch sử
function addToHistory(cityData, weatherData) {
    let searchEntry = {};
    searchEntry.city = cityData.name;
    searchEntry.lat = cityData.lat;
    searchEntry.lon = cityData.lon;
    searchEntry.temperature = weatherData.temperature;
    searchEntry.windspeed = weatherData.windspeed;
    searchEntry.timestamp = new Date().toLocaleString(); // thời gian tìm kiếm

    // Xóa các bản ghi trùng tên thành phố
    searchHistory = searchHistory.filter(function(item) {
        return item.city !== cityData.name;
    });

    // Thêm bản ghi mới lên đầu
    searchHistory.unshift(searchEntry);

    // Nếu nhiều hơn 10 bản ghi thì xóa bớt cái cuối
    if (searchHistory.length > 10) {
        searchHistory.pop();
    }

    // Lưu lại vào localStorage
    localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));

    // Cập nhật hiển thị trên giao diện
    updateHistoryDisplay();
}

// Hàm hiển thị danh sách lịch sử tìm kiếm
function updateHistoryDisplay() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    searchHistory.forEach(function(entry) {
        const li = document.createElement("li");

        // Hiển thị thông tin bằng template string
        li.innerHTML = `
            <strong>${entry.city}</strong><br>
            Nhiệt độ: ${entry.temperature}°C<br>
            Tốc độ gió: ${entry.windspeed} km/h<br>
            <small>${entry.timestamp}</small>
        `;

        // Khi click vào mục lịch sử thì tìm lại thành phố đó
        li.addEventListener("click", function() {
            document.getElementById("cityInput").value = entry.city;
            searchWeather(entry.city);
        });

        historyList.appendChild(li);
    });
}

// Hàm hiển thị thông tin thời tiết ra màn hình
function displayWeather(cityData, weatherData) {
    const weatherInfo = document.getElementById("weatherInfo");

    weatherInfo.innerHTML = `
        <h2>${cityData.name}</h2>
        <p>Nhiệt độ: ${weatherData.temperature}°C</p>
        <p>Tốc độ gió: ${weatherData.windspeed} km/h</p>
        <p>Mã thời tiết: ${weatherData.weathercode}</p>
    `;

    updateBackground(weatherData.weathercode);
    addToHistory(cityData, weatherData);
}

// Hàm chính: tìm và hiển thị thời tiết
function searchWeather(cityName) {
    getCoordinates(cityName).then(function(cityData) {
        if (cityData) {
            getWeather(cityData.lat, cityData.lon).then(function(weatherData) {
                if (weatherData) {
                    displayWeather(cityData, weatherData);
                } else {
                    alert("Không lấy được dữ liệu thời tiết");
                }
            });
        } else {
            alert("Không tìm thấy thành phố");
        }
    });
}

// Gắn sự kiện cho nút "Search"
document.getElementById("searchBtn").addEventListener("click", function() {
    const cityName = document.getElementById("cityInput").value.trim();
    if (cityName) {
        searchWeather(cityName);
    }
});

// Gắn sự kiện Enter trong ô input
document.getElementById("cityInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        const cityName = e.target.value.trim();
        if (cityName) {
            searchWeather(cityName);
        }
    }
});

// Khi load trang thì hiển thị lịch sử tìm kiếm đã lưu
updateHistoryDisplay();
