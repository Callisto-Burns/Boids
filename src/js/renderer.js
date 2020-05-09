const THREE = require('three')
const Boid = require('./js/Boid')
let world, camera, renderer

init()
animate()

/* Initialize */
function init() {
    
    initScene()
    initRenderer()
    initCamera()
    
}

/* Main animation loop */
function animate() {
    requestAnimationFrame(animate)
    render()
}

function render() {
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
    
    var boid = new Boid(world, 0, 0)
    world.add(boid)
<<<<<<< HEAD
=======

    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100,100,100,100),
        new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        })
    )
    plane.rotateX(Math.PI/2)
    world.add(plane)
>>>>>>> c5db1707688c492eed3093f94687fdcb9d8feea1
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