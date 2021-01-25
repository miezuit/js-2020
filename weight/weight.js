MERCURY = { mass: 3.303e+23, radius: 2.4397e6 }
VENUS = { mass: 4.869e+24, radius: 6.0518e6 } 
EARTH = { mass: 5.976e+24, radius: 6.37814e6 } 
MARS = { mass: 6.421e+23, radius: 3.3972e6 }
JUPITER = { mass: 1.9e+27, radius: 7.1492e7 }
SATURN = { mass: 5.688e+26, radius: 6.0268e7 }
URANUS = { mass: 8.686e+25, radius: 2.5559e7 }
NEPTUNE = { mass: 1.024e+26, radius: 2.4746e7 }

G = 6.67300E-11

function surfaceGravity(planet) {
    return G * planet.mass / (planet.radius * planet.radius)
}
function surfaceWeight(yourMass) {
    return yourMass * surfaceGravity()
}

document.querySelector("input[type='button']")
    .addEventListener("click", calculateAndShowWeights)

function calculateAndShowWeights() {
    let weightOnEarth = document.querySelector("#weight").value

}