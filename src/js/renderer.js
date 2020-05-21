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
    
    boid1 = new Boid(world)
    boid2 = new Boid(world)
    boid3 = new Boid(world)

    boid1.addBoid(boid2)
    boid1.addBoid(boid3)
    boid2.addBoid(boid1)
    boid2.addBoid(boid3)
    boid3.addBoid(boid1)
    boid3.addBoid(boid2)

}

function initCamera(){
    var window_scalar = 1/8
    camera = new THREE.OrthographicCamera(
        -window.innerWidth * window_scalar,
        window.innerWidth * window_scalar,
        window.innerHeight * window_scalar,
        -window.innerHeight * window_scalar,
        0.1,
        1000
    )
    camera.position.set(0,0,100)

}

function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
}