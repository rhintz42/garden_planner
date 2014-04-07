
function Terrain(environment) {
    var self = this,
        geometry,
        material;
    
    self.size = 500;
    self.step = 50;

    data = new Float32Array( (self._getNumSquaresWidth()*self._getNumSquaresDepth()) );

    self.environment = environment;

    geometry = new THREE.PlaneGeometry( self.size*2,
                                        self.size*2,
                                        self._getNumSquaresWidth() - 1,
                                        self._getNumSquaresDepth() - 1 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    
    for ( var i = 0; i < geometry.vertices.length; i ++ ) {
        geometry.vertices[ i ].y = 0;
    }
    

    material = new THREE.MeshBasicMaterial();

    THREE.Mesh.call( self, geometry, material );

    self.visible = true;

    self._addToEnvironment();

}

extend(THREE.Mesh, Terrain);


// This is just a tests function
Terrain.prototype._makeGroundGoUp = function() {
    var self = this;

    for(var i = 0; i<self.geometry.vertices.length; i++) {
        self.geometry.vertices[i].y = i;
    }
}

Terrain.prototype._getNumSquaresWidth = function() {
    var self = this;

    return (self.size/self.step) * 2;
}

Terrain.prototype._getNumSquaresDepth = function() {
    var self = this;

    return (self.size/self.step) * 2;
}

Terrain.prototype._addToEnvironment = function() {
    var self = this;

    self.environment.addToScene(self);
    self.environment.addToLists(self);
}

Terrain.prototype.indexToRow = function(index) {
    var self = this;

    return Math.floor( index / self._getNumSquaresWidth() );
}

Terrain.prototype.indexToCol = function(index) {
    var self = this;

    return index % self._getNumSquaresWidth();
}

Terrain.prototype.rowColToIndex = function(row, col) {
    var self = this;

    return (row * self._getNumSquaresWidth()) + col;
}









/* PARTIAL IMPLEMENTATION OF A GRID THAT CAN VARY IN HEIGHT


Terrain.prototype._updateGrid = function() {
    var self = this,
        grid = self.getGrid();

    for (i = 0; i < grid.geometry.vertices.length; i++) {
        grid.geometry.vertices[i].y = (i*100)+2;
    }
}

Terrain.prototype.getGrid = function() {
    var self = this;

    return self.grid;
}

Terrain.prototype.createGrid = function() {
    var self = this,
        geometry,
        material,
        grid,
        numRowLines,
        numColLines,
        row,
        col,
        xPos,
        yPos;
        
    geometry = new THREE.Geometry();

    numRowLines = self._getNumSquaresDepth();
    numColLines = self._getNumSquaresWidth();

    // Creates most of the lines for the Grid
    for (row = 0; row < numRowLines; row++) {
        zPos = -self.size + row*self.step;

        for (col = 0; col < numColLines; col++) {
            xPos = -self.size + col*self.step;
            
            currentIndex = self.rowColToIndex(row, col);
            nextRowIndex = self.rowColToIndex(row+1, col);
            nextColIndex = self.rowColToIndex(row, col+1);
            
            startGroundPoint = self.geometry.vertices[currentIndex];
            endRowGroundPoint = self.geometry.vertices[nextRowIndex];
            endColGroundPoint = self.geometry.vertices[nextColIndex];
            
            if(endColGroundPoint) {
                geometry.vertices.push( new THREE.Vector3( xPos, startGroundPoint.z+1, zPos ) );
                geometry.vertices.push( new THREE.Vector3( xPos+self.step, endColGroundPoint.z+1, zPos ) );
            } else {
                geometry.vertices.push( new THREE.Vector3( xPos, startGroundPoint.z+1, zPos ) );
                geometry.vertices.push( new THREE.Vector3( xPos+self.step, 1, zPos ) );
            }

            if(endRowGroundPoint) {
                geometry.vertices.push( new THREE.Vector3( xPos, startGroundPoint.z+1, zPos ) );
                geometry.vertices.push( new THREE.Vector3( xPos, endRowGroundPoint.z+1, zPos+self.step ) );
            } else {
                geometry.vertices.push( new THREE.Vector3( xPos, startGroundPoint.z+1, zPos ) );
                geometry.vertices.push( new THREE.Vector3( xPos, 1, zPos+self.step ) );
            }
        }
        
        geometry.vertices.push( new THREE.Vector3( self.size, 1, zPos ) );
        geometry.vertices.push( new THREE.Vector3( self.size, 1, zPos+self.step ) );
    }
    // Creates the last row of lines for the Grid
    for (col = 0; col < numColLines; col++) {
        xPos = -self.size + col*self.step;

        geometry.vertices.push( new THREE.Vector3( xPos, 1, self.size ) );
        geometry.vertices.push( new THREE.Vector3( xPos+self.step, 1, self.size ) );
    }

    material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );

    grid = new THREE.Line( geometry, material );
    grid.type = THREE.LinePieces;

    return grid;
}
*/
