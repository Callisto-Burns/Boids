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

    boid1.finalUpdate(delta)
    boid2.finalUpdate(delta)

    console.log(boid2.mesh.position)

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
    world.add(boid1)

    boid2 = new Boid(world, 10, 0, 0)
    world.add(boid2)

    boid1.addBoid(boid2)
    boid2.addBoid(boid1)
    
    vel1 = new THREE.Vector3(1,1,0)
    vel2 = new THREE.Vector3(-1,1,0)

    boid1.setVelocity(vel1)
    boid1.orientVector()
    boid2.setVelocity(vel2)
    boid2.orientVector()
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