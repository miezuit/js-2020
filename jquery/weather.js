async function showWeather(city) {
    // jquery
    $.ajax({
        url: "https://goweather.herokuapp.com/weather/" + city,
        // data: {
        //   zipcode: 97201
        // },
        success: function( result ) {
          document.querySelector('#temperature').innerHTML = result.temperature
        }
    })

    // fetch cu promisiuni
    fetch("https://goweather.herokuapp.com/weather/" + city)
        .then(response => response.json())
        .then(data => document.querySelector('#temperature').innerHTML = data.temperature)

    // fetch cu async/await
    response = await fetch("https://goweather.herokuapp.com/weather/" + city)
    data = await response.json()
    document.querySelector('#temperature').innerHTML = data.temperature
}

document.querySelector('#show').addEventListener('click', () => showWeather(
    document.querySelector('#city').value
))

// pyramid of doom:
// window.setTimeout(function() {
//     get("https://goweather.herokuapp.com/weather/" + city)
//         .success((result) => {
//             get("https://goweather.herokuapp.com/weather/" + city2)
//                 .success((result) => { 
//                     get("https://goweather.herokuapp.com/weather/" + city3
//                 }))
//         })


// cu promisiuni:
// window.setTimeout(1000)
//       .then((result) => get("https://goweather.herokuapp.com/weather/" + city))
//       .then((result) => get("https://goweather.herokuapp.com/weather/" + city2))
//       .then((result) => get("https://goweather.herokuapp.com/weather/" + city3))

