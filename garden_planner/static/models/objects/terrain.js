
function Terrain(environment) {
    var self = this,
        geometry,
        material,
        materials,
        //underTerrainGeometry,
        //underTerrainMaterial,
        i;
    
    self.size = 500;
    self.step = 25;

    data = new Float32Array( (self._getNumSquaresWidth()*self._getNumSquaresDepth()) );

    self.environment = environment;

    /*
    underTerrainGeometry = new THREE.PlaneGeometry( self.getWidthInPixels() + 50,
                                                    self.getDepthInPixels() + 50,
                                                    self._getNumSquaresWidth() + 1,
                                                    self._getNumSquaresDepth() + 1 );
    
    underTerrainGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    
    for (i = 0; i < underTerrainGeometry.vertices.length; i ++) {
        underTerrainGeometry.vertices[ i ].y = -1;
    }

    // Expands the front underTerrain to where the user can't see
    for (i = underTerrainGeometry.vertices.length-(self._getNumSquaresWidth()+2); i < underTerrainGeometry.vertices.length; i ++) {
        underTerrainGeometry.vertices[ i ].z = 5000;
    }

    // Expands the back underTerrain to where the user can't see
    for (i = 0; i <= self._getNumSquaresWidth() + 1; i ++) {
        underTerrainGeometry.vertices[ i ].z = -5000;
    }

    // Expands the right underTerrain to where the user can't see
    for (i = self._getNumSquaresWidth()+1; i < underTerrainGeometry.vertices.length; i+= self._getNumSquaresWidth()+2) {
        underTerrainGeometry.vertices[ i ].x = 5000;
    }

    // Expands the left underTerrain to where the user can't see
    for (i = 0; i < underTerrainGeometry.vertices.length; i+= self._getNumSquaresWidth()+2) {
        underTerrainGeometry.vertices[ i ].x = -5000;
    }

    underTerrainMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    self._underTerrain = new THREE.Mesh(underTerrainGeometry, underTerrainMaterial);

    */
    geometry = new THREE.PlaneGeometry( self.getWidthInPixels(),
                                        self.getDepthInPixels(),
                                        self._getNumSquaresWidth() - 1,
                                        self._getNumSquaresDepth() - 1 );

    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    
    for (i = 0; i < geometry.vertices.length; i ++ ) {
        geometry.vertices[ i ].y = 0;
    }

    //material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    /*
    materials = []
    materials.push(new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x0000ff }));

    material = new THREE.MeshFaceMaterial(materials);
    */

    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('static/images/texture-atlas2.jpg') } );

    for(i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].materialIndex = i % 3;
    }

    geometry.dynamic = true;


    //THREE.Mesh.call( self, geometry, material );
    self.mesh = new THREE.Mesh( geometry, material );

    /*
    geometry = new THREE.PlaneGeometry( self.getWidthInPixels(),
                                        self.getDepthInPixels(),
                                        self._getNumSquaresWidth() - 1,
                                        self._getNumSquaresDepth() - 1 );

    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    self.geometry = geometry;
    */

    self.bricks = [new THREE.Vector2(0, .666), new THREE.Vector2(.5, .666), new THREE.Vector2(.5, 1), new THREE.Vector2(0, 1)];
    self.clouds = [new THREE.Vector2(.5, .666), new THREE.Vector2(1, .666), new THREE.Vector2(1, 1), new THREE.Vector2(.5, 1)];
    self.crate = [new THREE.Vector2(0, .333), new THREE.Vector2(.5, .333), new THREE.Vector2(.5, .666), new THREE.Vector2(0, .666)];
    self.stone = [new THREE.Vector2(.5, .333), new THREE.Vector2(1, .333), new THREE.Vector2(1, .666), new THREE.Vector2(.5, .666)];
    self.water1 = [new THREE.Vector2(0, 0), new THREE.Vector2(.5, 0), new THREE.Vector2(.5, .333), new THREE.Vector2(0, .333)];
    self.water2 = [new THREE.Vector2(.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .333), new THREE.Vector2(.5, .333)];

    self._addToEnvironment();

}

//extend(THREE.Mesh, Terrain);

Terrain.prototype.getPointClosestTo = function(intersector) {
    var self = this;
}

Terrain.prototype.getWidthInPixels = function() {
    var self = this;

    return self.size*2;
}

Terrain.prototype.getDepthInPixels = function() {
    var self = this;

    return self.size*2;
}

/*
Terrain.prototype.getFaceIndex = function(mousePos) {

}
*/

//Terrain.prototype.setFaceColor = function(faceIndex, terrainType) {

Terrain.prototype.setFaceMaterial = function(faceIndex, terrainType) {
    var self = this,
        materialIndex = 0,
        geometry,
        environment,
        materials;

    if(terrainType === 'grass') {
        materialIndex = 2;
    } else if (terrainType === 'rock') {
        materialIndex = 1;
    }
    materialIndex = 0;

    //self.geometry.faces[faceIndex].materialIndex = materialIndex;

    /*geometry = new THREE.PlaneGeometry( self.getWidthInPixels(),
                                        self.getDepthInPixels(),
                                        self._getNumSquaresWidth() - 1,
                                        self._getNumSquaresDepth() - 1 );

    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    */
    //geometry = self.mesh.geometry;
    //self.mesh.geometry.faceVertexUvs[0] = [];
    self.mesh.geometry.uvsNeedUpdate = true;

    self.mesh.geometry.faceVertexUvs[0][faceIndex.faceIndex] = [ self.water2[0], self.water2[1], self.water2[3] ];
    //self.mesh.geometry.faceVertexUvs[0][faceIndex.faceIndex+1] = [ self.bricks[1], self.bricks[2], self.bricks[3] ];
    /*
    for(i = 0; i < self.mesh.geometry.faces.length; i+=12) {
        self.mesh.geometry.faceVertexUvs[0][i] = [ self.bricks[0], self.bricks[1], self.bricks[3] ];
        self.mesh.geometry.faceVertexUvs[0][i+1] = [ self.bricks[1], self.bricks[2], self.bricks[3] ];
         
        self.mesh.geometry.faceVertexUvs[0][i+2] = [ self.clouds[0], self.clouds[1], self.clouds[3] ];
        self.mesh.geometry.faceVertexUvs[0][i+3] = [ self.clouds[1], self.clouds[2], self.clouds[3] ];
         
        self.mesh.geometry.faceVertexUvs[0][i+4] = [ self.crate[0], self.crate[1], self.crate[3] ];
        self.mesh.geometry.faceVertexUvs[0][i+5] = [ self.crate[1], self.crate[2], self.crate[3] ];
         
        self.mesh.geometry.faceVertexUvs[0][i+6] = [ self.stone[0], self.stone[1], self.stone[3] ];
        self.mesh.geometry.faceVertexUvs[0][i+7] = [ self.stone[1], self.stone[2], self.stone[3] ];
         
        self.mesh.geometry.faceVertexUvs[0][i+8] = [ self.water[0], self.water[1], self.water[3] ];
        self.mesh.geometry.faceVertexUvs[0][i+9] = [ self.water[1], self.water[2], self.water[3] ];
         
        self.mesh.geometry.faceVertexUvs[0][i+10] = [ self.wood[0], self.wood[1], self.wood[3] ];
        self.mesh.geometry.faceVertexUvs[0][i+11] = [ self.wood[1], self.wood[2], self.wood[3] ];
    }
    */
    
    /*
    geometry.faceVertexUvs[0] = [];

    for(i = 0; i < geometry.faces.length; i++) {
        geometry.facesVertexUvs[0][i].materialIndex = i % 2;
    }
    */
    //self.geometry = geometry;
    //geometry.verticesNeedUpdate = true;

    /*
    material = self.mesh.material;

    scene = self.environment.getScene();
    scene.remove(self.mesh);

    self.mesh = new THREE.Mesh( geometry, material );

    scene.add(self.mesh);
    */
    //self.geometry.needsUpdate = true;
    //self.geometry.elementsNeedUpdate = true;

    return true;
}


// This is just a tests function
Terrain.prototype._makeGroundGoUp = function() {
    var self = this;

    for(var i = 0; i<self.mesh.geometry.vertices.length; i++) {
        self.mesh.geometry.vertices[i].y = i;
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

    self.environment.addToScene(self.mesh);
    self.environment.addToLists(self.mesh);
    //self.environment.addToScene(self._underTerrain);
}

Terrain.prototype._removeFromEnvironment = function() {
    var self = this,
        scene;
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
