function Scene() {
    THREE.Scene.call( this );
}

extend(THREE.Scene, Scene);

Scene.prototype.init = function() {
    var ambientLight = new THREE.AmbientLight( 0x606060 );
    var directionalLight = new THREE.DirectionalLight( 0xffffff );

    this.add( ambientLight );
    this.add( directionalLight );
}
