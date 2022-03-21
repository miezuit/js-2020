function randomJoke() {
    $.ajax({
        url: "http://api.icndb.com/jokes/random",
        // data: {
        //   zipcode: 97201
        // },
        success: function( result ) {
          document.querySelector('#joke').innerHTML = result.value.joke
        }
    })
}

document.querySelector('#newJoke').addEventListener('click', randomJoke)

randomJoke()