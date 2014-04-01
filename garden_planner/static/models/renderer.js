function Renderer() {

}
//  This extends the WebGLRenderer class and allows me to call all of
//      the functions of the superclass and create my own functions
Renderer.prototype = new THREE.WebGLRenderer();

Renderer.prototype.initRenderer = function() {
    this.setClearColor( 0xf0f0f0 );

    this.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.domElement );
}