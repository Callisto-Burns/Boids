const THREE = require('three')
const Boid = require('./js/Boid')
let world, camera, renderer

init()
animate()

function init() {
    world = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    camera.position.set(30,30,100)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    populateScene(world)
    
}

/* Main animation loop */
var lastUpdate = Date.now()
function animate() {
    requestAnimationFrame(animate)
    var deltaTime = Date.now() - lastUpdate
    lastUpdate = Date.now()

    render(deltaTime)
}

function render(deltaTime) {

    renderer.render(world, camera)
}

/* Add scene elements */
function populateScene(world) {
    var axesHelper = new THREE.AxesHelper(100)
    world.add(axesHelper)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    world.add(directionalLight)
    
    var boid = new Boid(world, 0, 0)
    world.add(boid)

}