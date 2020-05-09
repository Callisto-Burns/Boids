
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





    var _onMouseMove = bind(this, this._onMouseMove)
    var _onMouseDown = bind(this, this._onMouseDown)
    var _onMouseUp = bind(this, this._onMouseUp)
    var _onKeyDown = bind(this, this._onKeyDown)
    var _onKeyUp = bind(this, this._onKeyUp)

    this.domElement.addEventListener('contextmenu', contextmenu)
    this.domElement.addEventListener('mousemove', _onMouseMove)
    this.domElement.addEventListener('mousedown', _onMouseDown)
    this.domElement.addEventListener('mouseup', _onMouseUp)

    window.addEventListener('keydown', _onKeyDown)
    window.domElement.addEventListener('keyup', _onKeyUp)

    function bind(scope, fn) {
        return function() {
            fn.apply(scope, arguments)
        }
    }

    function setOrientation(controls){
        var quaternion = controls.object.quaternion
        lookDirection.set(0, 0, -1).applyQuaternion(quaternion)
        lat = 90 - MathUtils.radToDeg(spherical.phi)
        lon = MathUtils.radToDeg(spherical.theta)
    }

    this.handleResize()
    setOrientation(this)
}

export {FlightControls}