const THREE = require('three')
const Boid = require('./js/Boid')
const FlightControls = require('./js/FlightControls')
let world, camera, renderer, controls, boid
let clock = new THREE.Clock()

init()
animate()

/* Initialize */
function init() {
    
    initScene()
    initRenderer()
    initCamera()

    controls = new FlightControls(camera, renderer.domElement)
    
}

/* Main animation loop */
function animate() {
    requestAnimationFrame(animate)
    render()
}

function render() {
    var delta = clock.getDelta()
    renderer.render(world, camera)

    boid1.readyUpdate()
    boid2.readyUpdate()
    boid3.readyUpdate()

    boid1.finalUpdate(delta)
    boid2.finalUpdate(delta)
    boid3.finalUpdate(delta)

    controls.update(delta)
}

function initScene() {

    world = new THREE.Scene()
    var axesHelper = new THREE.AxesHelper(100)
    world.add(axesHelper)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    world.add(directionalLight)
    var gridHelper = new THREE.GridHelper(10000,10000)
    world.add(gridHelper)
    
    boid1 = new Boid(world, 0, 0, 0)
    boid2 = new Boid(world, 10, 0, 0)
    boid3 = new Boid(world, 5, 10, 0)

    boid1.addBoid(boid2)
    boid1.addBoid(boid3)
    boid2.addBoid(boid1)
    boid2.addBoid(boid3)
    boid3.addBoid(boid1)
    boid3.addBoid(boid2)

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