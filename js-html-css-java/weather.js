
document.querySelector("#show").addEventListener("click", showWeather)

function showWeather() {
    let city = document.querySelector("#city").value

    fetch(`https://goweather.herokuapp.com/weather/${city}`)
        .then(response => response.json())
        .then(weather => { 
            document.querySelector("#description").innerText = weather.description 
            document.querySelector("#temperature").innerText = weather.temperature
        })
}


