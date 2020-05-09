const THREE = require('three')

class Boid {

    // constants
    radius = 5
    height = 10
    radial_segment = 20
    height_segment = 2
    scale_initial_velocity = 0.1

    // attributes
    mesh = null
    velocity_x = 0
    velocity_y = 0
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
        this.velocity_x = Math.random()*this.scale_initial_velocity - this.scale_initial_velocity/2 // gives value in interval [-sc_in_vel, +sc_in_vel]
        this.velocity_y = Math.random()*this.scale_initial_velocity - this.scale_initial_velocity/2 // same as above comment
        this.mesh.rotation.z = (Math.atan2(this.velocity_x, this.velocity_y)) - Math.PI

    }

    setRotationX(euler_angle) {
        this.mesh.rotation.x = euler_angle
    }

    setRotationY(euler_angle) {
        this.mesh.rotation.y = euler_angle
    }

    setRotationZ(euler_angle) {
        this.mesh.rotation.z = euler_angle
    }

    addBoid(byoid) {
        this.nearbyoids.push(byoid)
    }

    setNearbyoids(byoids) {
        this.nearbyoids = byoids
    }

    rule1() {
        
        return {
            x: null,
            y: null
        }
    }

    rule2() {

        return {
            x: null,
            y: null
        }
    }

    rule3() {

        return {
            x: null,
            y: null
        }
    }

    update() {
        
        // update velocity with rules
        var v1 = this.rule1()
        var v2 = this.rule2()
        var v3 = this.rule3()

        this.mesh.position.x += this.velocity_x
        this.mesh.position.y += this.velocity_y
    }
} module.exports = Boid