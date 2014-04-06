function Renderer() {
    THREE.WebGLRenderer.call( this );
}

extend(THREE.WebGLRenderer, Renderer);

Renderer.prototype.init = function() {
    this.setClearColor( 0xf0f0f0 );

    this.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.domElement );
}
