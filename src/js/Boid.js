const THREE = require('three')

class Boid {

    // constants
    radius = 5
    height = 10
    radial_segment = 20
    height_segment = 2
    scale_initial_velocity = 1

    // attributes
    mesh = null
    velocity = null
    nearbyoids = []

    constructor(scene, start_x, start_y) {

        // initialize mesh with blue color 
        this.mesh = new THREE.Mesh(
            new THREE.ConeGeometry(this.radius, this.height, this.radial_segment, this.height_segment),
            new THREE.MeshBasicMaterial( { color: 0x0000ff } )
        )
        
        // place mesh on starting x and y, add to scene, and rotate on its side
        scene.add(this.mesh)
        this.mesh.position.x = start_x
        this.mesh.position.y = start_y

        // initialize random velocity and orient shape in direction of travel
        this.velocity = new THREE.Vector3(Math.random()*this.scale_initial_velocity, Math.random()*this.scale_initial_velocity, 0)
        this.orientVector()

    }

    orientVector() {
        this.mesh.rotation.z = -(Math.atan2(this.velocity.x, this.velocity.y))
    }

    addBoid(byoid) {
        this.nearbyoids.push(byoid)
    }

    setNearbyoids(byoids) {
        this.nearbyoids = byoids
    }

    findNearbyoids() {
        nearbyoids = []

    }

    rule1() {
        
        return new THREE.Vector3()
    }

    rule2() {

        return new THREE.Vector3()
    }

    rule3() {

        return new THREE.Vector3()
    }

    update() {
        
        // update velocity with rules
        var v1 = this.rule1()
        var v2 = this.rule2()
        var v3 = this.rule3()

        this.mesh.position.x += this.velocity.x
        this.mesh.position.y += this.velocity.z
    }
} module.exports = Boid