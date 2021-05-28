// fetch('http://api.icndb.com/jokes/random')
//     .then(response => response.json())
//     .then(data => {
//             document.write(data.value.joke)
//             return fetch('http://api.icndb.com/jokes/random')
//         }    
//     )
//     .then(response => response.json())
//     .then(data => document.write(data.value.joke))

async function getJokes() {
    try {
        let response = await fetch('http://api.icndb.com/jokes/random')
        let data = await response.json()
        document.write(data.value.joke)
    } catch(error) {
        document.write('Failed to fetch!')
    }
}

getJokes()
