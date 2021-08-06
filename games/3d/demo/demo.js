// initializam renderer-ul webgl
const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xbf901a, 1)

// adaugam canvas-ul creat de renderer in body
document.body.appendChild(renderer.domElement)

// definim scena
const scene = new THREE.Scene()

// definim camera (unghiul de cuprindere si aspect ratio)
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight)
// setam pozitia camerei in spatiu
camera.position.z = 30
// adaugam camera in scena
scene.add(camera)

const phongBlue = new THREE.MeshPhongMaterial({
    color: 0x224f89
})
const phongOrange = new THREE.MeshPhongMaterial({
    color: 0x908030
})

// facem un cub
const qubePrimitive = new THREE.BoxGeometry(10, 10, 10)
// cream un material simplu dintr-o singura culoare
const simpleMaterial = new THREE.MeshBasicMaterial({
    color: 0x909030
})
// invelim cubul abstract cu materialul => cubul 3d
const qube = new THREE.Mesh(qubePrimitive, phongBlue)
// adaugam cubul in scena
scene.add(qube)
// rotim cubul
qube.rotation.set(0.5, 0.5, 0)
// pubem cubul undeva in spatiu
qube.position.x = -10

// cream un torus
const torusForm = new THREE.TorusGeometry(10, 1.5, 6, 12)
// const phong = new THREE.MeshPhongMaterial({
//     color: 0x224f89
// })
const torus = new THREE.Mesh(torusForm, phongOrange)
scene.add(torus)
torus.rotation.set(0.4, 0.4, 0)
torus.position.x = 20

// adaugam lumina
// cream un punct de lumina alba dura
// exista si alte tipuri de lumini: AmbientLight, HemisphereLight
const light = new THREE.PointLight(0xffffff)
light.position.x = -30
light.position.y = 50
light.position.z = 30
// adaugam lumina in scena
scene.add(light)

var x = 0

// definim functia de randare a scenei
function render() {
    // functia se auto-inregistreaza ca sa fie apelata la fiecare frame
    // ea va fia apelata de 60 de ori/s (60fps)
    requestAnimationFrame(render)
    renderer.render(scene, camera)
    qube.rotation.y += 0.01
    x += 0.01
    torus.scale.y = Math.abs(Math.sin(x))
    torus.rotation.x += 0.01
}
render()


