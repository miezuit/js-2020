
try {
    hello("Hello JS")
    hello("Hello JS")
    hello("Hello JS")
} catch(error) {
    if (error instanceof ReferenceError) {
        console.log("Sorry! There was an error: " + error.message)
    } else {
        console.log("Suspicious pointer corrupted virtual machine")
    }
}
