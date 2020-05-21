const THREE = require('three')

// general constants
let num_rays = 10, sight_radius = 10, body_radius = 5, body_height = 10, 
    radial_segment = 20, height_segment = 2, v_scalar = 3, sphere_segment = 16

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

    // initialize nearbyoids array as empty
    this.nearbyoids = []

    // initialize random velocity
    this.velocity = new THREE.Vector3(
        Math.random() * v_scalar - v_scalar / 2, 
        Math.random() * v_scalar - v_scalar / 2, 
        0
    )
    this.orientVector()

    // initialize a zero Vector3 difference vector to be used in updating
    this.dif_vector = new THREE.Vector3(0,0,0)
}

Boid.prototype = Object.create(THREE.Object3D.prototype)

Boid.prototype.constructor = Boid

/** constants for updating velocities and positions **/
let d_v_scalar = .125, p_v_scalar = .1, personal_space = 6, speed_limit = 1

// if boid is too close to nearbyoids, then move it back to the limit of the distance, return a difference vector
Boid.prototype.rule1 = function(){

    if (this.nearbyoids.length == 0){
        return new THREE.Vector3(0,0,0)
    }
    var ret_vec = new THREE.Vector3(0,0,0)
    var copy_position = new THREE.Vector3(0,0,0)
    copy_position.copy(this.mesh.position)
    for (i = 0; i < this.nearbyoids.length; i++) {
        if (Math.abs(this.nearbyoids[i].mesh.position.distanceTo(this.mesh.position)) < personal_space){
            ret_vec.add(copy_position.addScaledVector(this.nearbyoids[i].mesh.position, -1))
        }
    }

    return ret_vec
}

// averages difference of velocity to nearbyoids velocities, returning a difference vector 
Boid.prototype.rule2 = function(){

    if (this.nearbyoids.length == 0){
        return new THREE.Vector3(0,0,0)
    }
    var ret_vec = new THREE.Vector3(0,0,0)
    var n = this.nearbyoids.length
    var copy_nearbyoid_position = new THREE.Vector3(0,0,0)
    for (i = 0; i < this.nearbyoids.length; i++){
        copy_nearbyoid_position.copy(this.nearbyoids[i].velocity)
        ret_vec.add(copy_nearbyoid_position.addScaledVector(this.velocity, -1))
    }
    ret_vec.multiplyScalar(this.nearbyoids.length * (1/d_v_scalar))

    return ret_vec
}

// moves boid closer to overall average position, return a difference vector
Boid.prototype.rule3 = function(){

    if (this.nearbyoids.length == 0){
        return new THREE.Vector3(0,0,0)
    }
    var ret_vec = new THREE.Vector3(0,0,0)
    var n = this.nearbyoids.length
    // sum up all the position vectors of this boid and the nearbyoids
    ret_vec.add(this.mesh.position)
    for (i = 0; i < this.nearbyoids.length; i++){
        ret_vec.add(this.nearbyoids[i].mesh.position)
    }
    // divide the ret_vec so it is an average position
    ret_vec.divideScalar(n+1)
    // the ret_vec should point towards the average position and be p_v_scalar*(difference vector b/w avg pos and this.pos)
    ret_vec.addScaledVector(this.mesh.position, -1)
    ret_vec.multiplyScalar(p_v_scalar)
    
    return ret_vec
}

// limits the speed of the boids
Boid.prototype.rule4 = function(){

    // uses length squared for efficiency fuck with me
    if (this.velocity.lengthSq() > speed_limit * speed_limit){
        this.velocity.setLength(speed_limit)
        this.dif_vector.setLength(0)
    }
}

Boid.prototype.differenceVector = function(){
    // create the difference vector as zero vector to be added to
    dif_vec = new THREE.Vector3(0,0,0)

    // add velocity changing rules to the difference vector
    dif_vec.add(this.rule1())
    //dif_vec.add(this.rule2())
    dif_vec.add(this.rule3())
    this.rule4()

    return dif_vec
}

// should be called before finalUpdate, allows multiple boids to update positions simultaneously
Boid.prototype.readyUpdate = function() {
    this.dif_vector = this.differenceVector()
}

// actually updates the positions and velocity
Boid.prototype.finalUpdate = function(delta){
    // update the velocity
    this.velocity = this.velocity.addScaledVector(this.dif_vector, delta * v_scalar)

    // update the position
    this.mesh.position.addScaledVector(this.velocity, delta * v_scalar)

    // update the orientation
    this.orientVector()

}

Boid.prototype.orientVector = function(){
    this.mesh.rotation.z = Math.atan2(this.velocity.y, this.velocity.x) - Math.PI / 2
}

Boid.prototype.addBoid = function(boid){
    this.nearbyoids.push(boid)
}

Boid.prototype.setVelocity = function(vel){
    this.velocity.copy(vel)
}

module.exports = Boid