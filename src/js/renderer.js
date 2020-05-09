const THREE = require('three')
let world, camera, renderer, plane

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
    plane.rotation.y += 0.01
    renderer.render(world, camera)
}

function initScene() {

    world = new THREE.Scene()
    var axesHelper = new THREE.AxesHelper(100)
    world.add(axesHelper)
    var gridHelper = new THREE.GridHelper(1000,1000)
    world.add(gridHelper)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    world.add(directionalLight)

    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100,100,100,100),
        new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        })
    )
    plane.rotateX(Math.PI/2)
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
}