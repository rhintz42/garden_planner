function Camera() {
    THREE.PerspectiveCamera.call( this, 75, window.innerWidth / window.innerHeight, 0.1, 1750 );
}

extend(THREE.PerspectiveCamera, Camera);

Camera.prototype.init = function() {
    this.position.x = 0;
    this.position.y = 500;
    this.position.z = -1000;
    this.lookAt( new THREE.Vector3( 0, 0, 0 ) );
}
