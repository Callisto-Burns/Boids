const THREE = require('three')
let num_rays = 10, sight_radius = 10, body_radius = 5, body_height = 10, 
    radial_segment = 20, height_segment = 2, v_scalar = 10, sphere_segment = 16

var Boid = function(...args){
    THREE.Object3D.apply(this, [])
    // attach the scene as a property
    this.scene = args[0]

    // make mesh
    this.mesh = new THREE.Mesh(
        new THREE.ConeGeometry(body_radius, body_height, radial_segment, height_segment),
        new THREE.MeshBasicMaterial( { color: 0x0000ff } )
    )
    this.add(this.mesh)
    this.scene.add(this.mesh)
    this.mesh.position.x = args[1]
    this.mesh.position.y = args[2]
    this.mesh.position.z = args[3]
    

    // make surrounding sphere, make it invisible
    this.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(sight_radius, sphere_segment, 2),
        new THREE.MeshBasicMaterial( { color: 0x0000ff } )
    )
    this.add(this.sphere)
    this.sphere.visible = false;
    this.scene.add(this.sphere)

    // intitialize nearbyoids array as empty
    this.nearbyoids = []

    // intitialize random velocity
    this.velocity = new THREE.Vector3(
        Math.random() * v_scalar - v_scalar / 2, 
        Math.random() * v_scalar - v_scalar / 2, 
        0
    )
    this.orientVector()
}

Boid.prototype = Object.create(THREE.Object3D.prototype)

Boid.prototype.constructor = Boid

Boid.prototype.update = function(delta){
    this.mesh.position.addScaledVector(this.velocity, delta * v_scalar)
}

Boid.prototype.orientVector = function(){
    this.mesh.rotation.z = Math.atan2(this.velocity.y, this.velocity.x) - Math.PI / 2
}

module.exports = Boid