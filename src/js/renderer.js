const THREE = require('three')
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

    camera.position.z = 5
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    populateScene(world)
}

/* Main animation frame */
function animate() {
    requestAnimationFrame(animate)
    var deltaTime = getDeltaTime() 

    console.log('delta time: ' + deltaTime)
    render()
}

function render() {


    renderer.render(world, camera)
}

/* Add scene elements */
function populateScene(world) {

}

/** Returns delta time in milliseconds */
var lastUpdate = Date.now()
function getDeltaTime(){
    var deltaTime = Date.now() - lastUpdate
    lastUpdate = Date.now()
    return deltaTime / 1000
}