const input = document.querySelector('#url')
const anchor = document.querySelector('#shortUrl')

document.querySelector('input[type="button"]')
        .addEventListener('click', shortify)

async function shortify() {
    const request = {
        longUri: input.value
    }
    const body = JSON.stringify(request)
    console.log(body)
    const resp = await fetch(
        'http://localhost:8080/short',
        {
            method: "POST",
            body: body,
            headers: {  
                'Content-Type': 'application/json'
            },
        }
    )
    const json = await resp.json()
    const shortUri = json.shortUri
    anchor.innerText = shortUri
    anchor.setAttribute('href', shortUri)
}