
const THREE = require('three')
const {Vector3, Quaternion, Spherical, MathUtils} = THREE

var FlightControls = function (object, domElement) {

    if (domElement === undefined){
        console.warn('FlightControls: The second parameter "domElement" is now mandatory')
        domElement = document
    }

    this.object = object
    this.domElement = domElement

    if (domElement) this.domElement.setAttribute('tabindex', -1)

    // API

    this.movementSpeed = 30
    this.sprintMultiplier = 3.0
    this.lookSpeed = 0.005
    
    // Private Variables
    var lat = 0
    var lon = 0

    var lookDirection = new Vector3()
    var spherical = new Spherical()
    var target = new Vector3()
    var quaternion = new Quaternion()
    var mouseX = 0
    var mouseY = 0

    var movementState = {forward: 0, back: 0, left: 0, right: 0, up: 0, down: 0}
    var movementDirection = new Vector3(0,0,0)

    var isMouseDown = false
    var isSprint = false

    var mouseX
    var mouseY

    var viewHalfX
    var viewHalfY

    this.handleResize = function() {
        if (this.domElement === document) {
            viewHalfX = window.innerWidth / 2
            viewHalfY = window.innerHeight / 2
        }
        else {
            viewHalfX = this.domElement.offsetWidth / 2
            viewHalfY = this.domElement.offsetHeight / 2
        }
    }
    this.handleResize()

    this.onMouseMove = function (event){
        if(isMouseDown){
            if (this.domElement === document) {
                mouseX = event.pageX - viewHalfX
                mouseY = event.pageY - viewHalfY
            }
            else {
                mouseX = event.pageX - this.domElement.offsetLeft - viewHalfX
                mouseY = event.pageY - this.domElement.offsetRight - viewHalfY
            }
        }
    }

    this.onMouseDown = function(){
        isMouseDown = true
    }

    this.onMouseUp = function(){
        isMouseDown = false
    }

    var contextmenu = function(event){
        event.preventDefault()
    }

    this.onKeyDown = function (event){
        switch (event.keyCode){
            case 16: /* Shift */
                isSprint = true
                break
            case 32: /* Space */
                movementState.up = 1
                break
            case 17: /* Control */
                movementState.down = 1
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
        this.updateMovementVector()
    }

    this.onKeyUp = function(event){
        switch (event.keyCode){
            case 16: /* Shift */
                isSprint = false
                break
            case 32: /* Space */
                movementState.up = 0
                break
            case 17: /* Control */
                movementState.down = 0
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
        this.updateMovementVector()
    }

    this.updateMovementVector = function(){
        movementDirection.z = movementState.back - movementState.forward
        movementDirection.y = movementState.up - movementState.down
        movementDirection.x = movementState.right - movementState.left
        movementDirection.normalize()
    }

    this.update = function (delta) {

        if (isMouseDown) {
            /* Translate camera along local z axis */
            this.object.translateZ(movementDirection.z * this.movementSpeed * delta * this.sprintMult(isSprint))
        }
        else {
            /* Translate camera along axis formed by projecting projecting camera local -z (facing direction) onto global xz plane */
            var cameraWorldDirection = this.object.getWorldDirection() //For some reason this vector is just <0,0,-1> even though camera is rotated
            cameraWorldDirection.applyQuaternion(this.object.quaternion)
            var horizontalCameraDirection = new Vector3(cameraWorldDirection.x, 0, cameraWorldDirection.z)
            var horizontalTranslation = -movementDirection.z * this.movementSpeed * delta * this.sprintMult(isSprint)
            this.object.translateOnAxis(horizontalCameraDirection, horizontalTranslation)
        }
        /* Translate camera along local x axis */
        this.object.translateX(movementDirection.x * this.movementSpeed * delta * this.sprintMult(isSprint)) 

        { /* Translate camera along global Y axis */
            var verticalTranslation = movementDirection.y * this.movementSpeed * delta * this.sprintMult(isSprint)
            var verticalAxis = new Vector3(0,1,0)
            this.object.translateOnAxis(verticalAxis, verticalTranslation)
        }

    }

    this.sprintMult = function (isSprint){
        if (isSprint){
            return this.sprintMultiplier
        } 
        else {
            return 1
        }
    }

    /* Allows the callbacks for the event listeners access to "this" refering to instance of void */
    /* Without binding, callbacks cannot access properties of "this" */
    function bind(scope, fnc){
        return function () {
            fnc.apply(scope, arguments)
        }
    }

    var _onMouseMove = bind(this, this.onMouseMove)
    var _onMouseDown = bind(this, this.onMouseDown)
    var _onMouseUp = bind(this, this.onMouseUp)
    var _onKeyDown = bind(this, this.onKeyDown)
    var _onKeyUp = bind(this, this.onKeyUp)

    this.domElement.addEventListener('contextmenu', contextmenu)
    this.domElement.addEventListener('mousemove', _onMouseMove)
    this.domElement.addEventListener('mousedown', _onMouseDown)
    this.domElement.addEventListener('mouseup', _onMouseUp)

    window.addEventListener('keydown', _onKeyDown)
    window.addEventListener('keyup', _onKeyUp)

}



module.exports = FlightControls


    
    