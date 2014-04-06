
function Terrain() {
    var self = this,
        grid,
        size = 500,
        step = 50,
        i;
    
    grid = self.createGrid();
        
    THREE.Mesh.call( self, new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshBasicMaterial() );

    self.rotation.x = - Math.PI / 2;
    self.visible = false;
    self.grid = grid;
}

extend(THREE.Mesh, Terrain);





//--------------------------- addToScene Method ------------------------

Terrain.prototype.addToScene = function(scene) {
    var self = this;

    scene.add(self.getGrid());
    scene.add(self);
}








//----------------------------- Grid Functions --------------------------

Terrain.prototype.getGrid = function() {
    var self = this;

    return self.grid;
}

Terrain.prototype.createGrid = function() {
    var size = 500,
        step = 50,
        geometry,
        material,
        grid;
        
    geometry = new THREE.Geometry();

    for (i = - size; i <= size; i += step) {
        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
    }

    material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );

    grid = new THREE.Line( geometry, material );
    grid.type = THREE.LinePieces;

    return grid;
}
