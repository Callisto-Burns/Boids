const THREE = require('three')
let scene, camera, renderer, cube

init()
function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    geometry = new THREE.ConeGeometry(1, 3, 20, 20)
    material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    })
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5
}

let scalar = 0
function animate() {

    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.05
    cube.rotation.z += 0.06
    
    renderer.render(scene, camera)
}

animate()