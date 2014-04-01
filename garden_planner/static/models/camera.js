function Camera() {
    THREE.PerspectiveCamera.call( this, 75, window.innerWidth / window.innerHeight, 0.1, 1750 );
}

extend(THREE.PerspectiveCamera, Camera);


function extend(base, constructor) {
    var prototype = new Function();
    prototype.prototype = base.prototype;
    constructor.prototype = new prototype();
    constructor.prototype.constructor = constructor;
}

Camera.prototype.initCamera = function() {
    this.position.x = 0;
    this.position.y = 500;
    this.position.z = -1000;
    this.lookAt( new THREE.Vector3( 0, 0, 0 ) );
}
