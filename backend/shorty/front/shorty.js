const input = document.querySelector('#url')
const anchor = document.querySelector('#shortUrl')

document.querySelector('input[type="button"]')
        .addEventListener('click', shortify)

async function shortify() {
    const request = {
        longUri: input.value
    }
    const resp = await fetch(
        'http://localhost:8080/short',
        {
            method: "POST",
            body: JSON.stringify(request)
        }
    )
    const json = await resp.json()
    const shortUri = json.shortUri
    anchor.innerText = shortUri
    anchor.setAttribute('href', shortUri)
}