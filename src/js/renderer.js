const THREE = require('three')
const Boid = require('./js/Boid')
<<<<<<< HEAD
const FlightControls = require('./js/FlightControls')
let world, camera, renderer, controls
=======
let world, camera, renderer, plane, boid
>>>>>>> 093b6647a06250dec4c71ca22e0f21323ccadd62

init()
animate()

/* Initialize */
function init() {
    
    initScene()
    initRenderer()
    initCamera()

    controls = FlightControls(camera, renderer.domElement)
    
}

/* Main animation loop */
function animate() {
    requestAnimationFrame(animate)
    render()
}

function render() {
    boid.update()
    renderer.render(world, camera)
}

function initScene() {

    world = new THREE.Scene()
    var axesHelper = new THREE.AxesHelper(100)
    world.add(axesHelper)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    world.add(directionalLight)
    var gridHelper = new THREE.GridHelper(10000,10000)
    world.add(gridHelper)
    
    boid = new Boid(world, 0, 0)
    world.add(boid)
}

function initCamera(){
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(30,30,100)

}

function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
}