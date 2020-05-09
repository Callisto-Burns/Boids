const THREE = require('three')

class Boid {

    // constants
    radius = 5
    height = 10
    radial_segment = 20
    height_segment = 2
    scale_initial_velocity = 10

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
        //this.mesh.rotation.y += 90

        // initialize random velocity and orient shape in direction of travel
        //velocity_x = Math.random()*scale_initial_velocity - scale_initial_velocity/2 // gives value in interval [-sc_in_vel, +sc_in_vel]
        //velocity_y = Math.random()*scale_initial_velocity - scale_initial_velocity/2 // same as above comment
        //this.mesh.rotation.z = 90 - (Math.atan2(velocity_x, velocity_y) * 180 / Math.PI)

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
        v1 = rule1()
        v2 = rule2()
        v3 = rule3()
    }
} module.exports = Boid