var Scene = function() {

}

Scene.prototype = new THREE.Scene();

Scene.prototype.initScene = function() {
    var ambientLight = new THREE.AmbientLight( 0x606060 );
    var directionalLight = new THREE.DirectionalLight( 0xffffff );

    this.add( ambientLight );
    this.add( directionalLight );
}
