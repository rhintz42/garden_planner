function Renderer() {
    THREE.WebGLRenderer.call( this );
}

extend(THREE.WebGLRenderer, Renderer);

Renderer.prototype.init = function(container_id) {
    this.setClearColor( 0xf0f0f0 );

    this.setSize( 600, 500 );
    var container = document.getElementById(container_id);
    container.appendChild( this.domElement );
}
