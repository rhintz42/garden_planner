var Camera = function() {

}

Camera.prototype =  new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1750 );

Camera.prototype.initCamera = function() {
    this.position.x = 0;
    this.position.y = 500;
    this.position.z = -1000;
    this.lookAt( new THREE.Vector3( 0, 0, 0 ) );
}
