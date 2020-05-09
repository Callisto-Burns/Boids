const THREE = require('three')
<<<<<<< HEAD
const Boid = require('./js/Boid')
let world, camera, renderer
=======
let world, camera, renderer, plane
>>>>>>> 4869e8389cb383379d1d529dddae147030fb251b

init()
animate()

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
    plane.rotation.y += 0.01
    renderer.render(world, camera)
}

/* Add scene elements */
function initScene() {
    world = new THREE.Scene()
    var axesHelper = new THREE.AxesHelper(100)
    world.add(axesHelper)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    world.add(directionalLight)
<<<<<<< HEAD
    
    var boid = new Boid(world, 0, 0)
    world.add(boid)

=======

    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10,10),
        new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        })
    )
    world.add(plane)
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
>>>>>>> 4869e8389cb383379d1d529dddae147030fb251b
}