
const THREE = require('three')
const {Vector3, Quaternion, Spherical, MathUtils} = THREE

var FlightControls = (object, domElement) => {

    if (domElement === undefined){
        console.warn('FlightControls: The second parameter "domElement" is now mandatory')
        domElement = document
    }

    this.object = object
    this.domElement = domElement

    if (domElement) this.domElement.setAttribute('tabindex', -1)

    // API

    this.movementSpeed = 1.0
    this.lookSpeed = 0.005

    // Private Variables
    var lat = 0
    var lon = 0

    var lookDirection = new Vector3()
    var spherical = new Spherical()
    var target = new Vector3()

    var movementState = {forward: 0, back: 0, left: 0, right: 0}
    var velocity = new Vector3(0,0,0)
    var movementAxes = new Vector3(0,0,0)

    var isMouseDown = false

    function _onMouseMove(){
        if(isMouseDown){
            // enable mouse to turn camera while left mouse down
            console.log('Move')
        }
    }

    function _onMouseDown(){
        console.log('Down')
        isMouseDown = true
    }

    function _onMouseUp(){
        console.log('Up')
        isMouseDown = false
    }

    function contextmenu(event){
        event.preventDefault()
        console.log('Context')
    }

    function _onKeyDown(event){
        console.log('KeyDown')
        switch (event.keyCode){
            case 16: /* Shift */
                // Move faster
                break
            case 87: /* W */ 
                movementState.forward = 1
                break
            case 83: /* S */
                movementState.back = 1
                break
            case 65: /* A */ 
                movementState.left = 1
                break
            case 68: /* D */
                movementState.right = 1
                break
            case 38: /* Up */ 
                movementState.forward = 1
                break
            case 40: /* Down */
                movementState.back = 1
                break
            case 37: /* Left */ 
                movementState.left = 1
                break
            case 39: /* Right */
                movementState.right = 1
                break
        }   
        console.log('(' + movementAxes.x + ',' + movementAxes.y + ',' + movementAxes.z + ')')
        updatePosition()
    }

    function _onKeyUp(event){
        console.log("KeyUp")
        switch (event.keyCode){
            case 16: /* Shift */
                // Move faster
                break
            case 87: /* W */ 
                movementState.forward = 0
                break
            case 83: /* S */
                movementState.back = 0
                break
            case 65: /* A */ 
                movementState.left = 0
                break
            case 68: /* D */
                movementState.right = 0
                break
            case 38: /* Up */ 
                movementState.forward = 0
                break
            case 40: /* Down */
                movementState.back = 0
                break
            case 37: /* Left */ 
                movementState.left = 0
                break
            case 39: /* Right */
                movementState.right = 0
                break
        }   
        console.log('(' + movementAxes.x + ',' + movementAxes.y + ',' + movementAxes.z + ')')
        updatePosition()
    }

    function updatePosition(){
        movementAxes.z = movementState.back - movementState.forward
        movementAxes.x = movementState.right - movementState.left
        object.position.z += movementAxes.z * movementSpeed
        object.position.x += movementAxes.x * movementSpeed
    }

    //var _onMouseMove = bind(this, this._onMouseMove)
    //var _onMouseDown = bind(this, this._onMouseDown)
    //var _onMouseUp = bind(this, this._onMouseUp)
    //var _onKeyDown = bind(this, this._onKeyDown)
    //var _onKeyUp = bind(this, this._onKeyUp)

    this.domElement.addEventListener('contextmenu', contextmenu)
    this.domElement.addEventListener('mousemove', _onMouseMove)
    this.domElement.addEventListener('mousedown', _onMouseDown)
    this.domElement.addEventListener('mouseup', _onMouseUp)

    window.addEventListener('keydown', _onKeyDown)
    window.addEventListener('keyup', _onKeyUp)

    /*function bind(scope, fn) {
        return function() {
            fn.apply(scope, arguments)
        }
    }*/
    /*
    function setOrientation(controls){
        var quaternion = controls.object.quaternion
        lookDirection.set(0, 0, -1).applyQuaternion(quaternion)
        lat = 90 - MathUtils.radToDeg(spherical.phi)
        lon = MathUtils.radToDeg(spherical.theta)
    }*/

    //this.handleResize()
    //setOrientation(this)
}

module.exports = FlightControls