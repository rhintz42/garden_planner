/*
*    PUT OPERATION STUFF INTO LIB
*/
function Terrain(environment) {
    var self = this,
        geometry,
        material,
        materials,
        i;
    
    self.size = 500;
    self.step = 25;
    self.environment = environment;

    self.createMesh();

    self.createTextures();

    self._addToEnvironment();
}

extend(THREE.Mesh, Terrain);

Terrain.prototype._addToEnvironment = function() {
    var self = this;

    self.environment.addObjToScene(self);
    self.environment.addObjToLists(self);
}

Terrain.prototype._removeFromEnvironment = function() {
    var self = this,
        scene;
}

Terrain.prototype.createGeometry = function() {
    var self = this,
        geometry;

    //create geometry
    geometry = new THREE.PlaneGeometry( self.getWidthInPixels(),
                                        self.getDepthInPixels(),
                                        self.getNumSquaresWidth(),
                                        self.getNumSquaresDepth() );
    //rotate geometry to be correct
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    geometry.dynamic = true;
    return geometry;
}

Terrain.prototype.createMaterial = function() {
    var self = this,
        material;
    //create Material
    material =  new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('static/images/texture-atlas2.jpg') } );

    return material;
}

Terrain.prototype.createMesh = function() {
    var self = this;

    //create Mesh
    THREE.Mesh.call( self, self.createGeometry(), self.createMaterial() );
}

Terrain.prototype.createTextures = function() {
    var self = this;

    self.bricks = [new THREE.Vector2(0, .67), new THREE.Vector2(.49, .67), new THREE.Vector2(.49, 1), new THREE.Vector2(0, 1)];
    self.clouds = [new THREE.Vector2(.5, .666), new THREE.Vector2(1, .666), new THREE.Vector2(1, 1), new THREE.Vector2(.5, 1)];
    self.crate = [new THREE.Vector2(0, .34), new THREE.Vector2(.49, .34), new THREE.Vector2(.49, .666), new THREE.Vector2(0, .666)];
    self.stone = [new THREE.Vector2(.5, .333), new THREE.Vector2(1, .333), new THREE.Vector2(1, .666), new THREE.Vector2(.5, .666)];
    self.water1 = [new THREE.Vector2(.01, .01), new THREE.Vector2(.49, .01), new THREE.Vector2(.49, .333), new THREE.Vector2(.01, .333)];
    self.water2 = [new THREE.Vector2(.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .333), new THREE.Vector2(.5, .333)];

    self.brickFaces = [];
    self.brickFaces.push( [ self.bricks[3], self.bricks[0], self.bricks[2] ] );
    self.brickFaces.push( [ self.bricks[0], self.bricks[1], self.bricks[2] ] );

    self.crateFaces = [];
    self.crateFaces.push( [ self.crate[3], self.crate[0], self.crate[2] ] );
    self.crateFaces.push( [ self.crate[0], self.crate[1], self.crate[2] ] );
}

Terrain.prototype.getDepthInPixels = function() {
    var self = this;

    return self.size*2;
}

Terrain.prototype.getAdjustedFaceIndex = function(faceIndex){
    return faceIndex.faceIndex - (faceIndex.faceIndex % 2);
}

Terrain.prototype.getHeightFromIntersector = function(intersector, point) {
    var self = this,
        verticeIndexes = [],
        pointX,
        pointZ,
        det,
        p1,
        p2,
        p3,
        height,
        l1,
        l2,
        l3;

    if(point !== undefined) {
        pointX = point.x;
        pointZ = point.z;
    } else {
        pointX = intersector.point.x;
        pointZ = intersector.point.z;
    }

    verticeIndexes.push(intersector.face.a);
    verticeIndexes.push(intersector.face.b);
    verticeIndexes.push(intersector.face.c);

    p1 = self.geometry.vertices[verticeIndexes[0]];
    p2 = self.geometry.vertices[verticeIndexes[1]];
    p3 = self.geometry.vertices[verticeIndexes[2]];

    det = (p2.z - p3.z) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.z - p3.z);

    l1 = ((p2.z - p3.z) * (pointX - p3.x) + (p3.x - p2.x) * (pointZ - p3.z)) / det;
    l2 = ((p3.z - p1.z) * (pointX - p3.x) + (p1.x - p3.x) * (pointZ - p3.z)) / det;
    l3 = 1 - l1 - l2;

    height = l1 * p1.y + l2 * p2.y + l3 * p3.y;

    return height;
}

Terrain.prototype.getIndexToRow = function(index) {
    var self = this;

    return Math.floor( index / self.getNumSquaresWidth() );
}

Terrain.prototype.getIndexToCol = function(index) {
    var self = this;

    return index % self.getNumSquaresWidth();
}

Terrain.prototype.getNumSquaresWidth = function() {
    var self = this;

    return (self.size/self.step) * 2;
}

Terrain.prototype.getNumVerticesWidth = function() {
    var self = this;

    return ((self.size/self.step) * 2) + 1;
}

Terrain.prototype.getNumSquaresDepth = function() {
    var self = this;

    return (self.size/self.step) * 2;
}

Terrain.prototype.getNumVerticesDepth = function() {
    var self = this;

    return ((self.size/self.step) * 2) + 1;
}

Terrain.prototype.getRowColToIndex = function(row, col) {
    var self = this;

    return (row * self.getNumSquaresWidth()) + col;
}

Terrain.prototype.getSizeHalf = function() {
    return this.size;
}

Terrain.prototype.getSize = function() {
    return this.size * 2;
}

Terrain.prototype.getStep = function() {
    return this.step;
}

Terrain.prototype.getTexture = function(type, index) {
    var self = this;

    offset = index % 2;

    if(type === 'brick') {
        return self.brickFaces[offset];
    } else if (type === 'rock' || type === 'stone' || type === 'crate') {
        return self.crateFaces[offset];
    }

    return self.water1;
}

Terrain.prototype.getWidthInPixels = function() {
    var self = this;

    return self.size*2;
}

Terrain.prototype.setFaceHeight = function(faceIndex, heightDif, type) {
    var self = this,
        index,
        newY;

    if(faceIndex === null)
        return false;

    index = self.getAdjustedFaceIndex(faceIndex);

    verticeIndex = self.getVerticeIndexFromPoint(faceIndex.point);

    newY = self.geometry.vertices[verticeIndex].y + heightDif;

    self.geometry.vertices[verticeIndex].y = newY;

    self.geometry.verticesNeedUpdate = true;
}

Terrain.prototype.getPointXToCol = function(pointX) {
    var self = this,
        adjustedX;

    adjustedX = pointX + self.getSizeHalf() + self.step/2;

    return Math.floor(adjustedX/self.step);
}

Terrain.prototype.getPointZToRow = function(pointZ) {
    var self = this,
        adjustedZ;

    adjustedZ = pointZ + self.getSizeHalf() + self.step/2;

    return Math.floor(adjustedZ/self.step);
}

Terrain.prototype.getVerticeIndexFromPoint = function(point) {
    var self = this,
        x,
        z;

    x = point.x;
    z = point.z;
    
    row = self.getPointZToRow(z);
    col = self.getPointXToCol(x);
    return (row * self.getNumVerticesWidth()) + col;
}

Terrain.prototype.setFaceTexture = function(faceIndex, terrainType) {
    var self = this,
        texture,
        index;

    if(faceIndex ===null)
        return false;

    index = self.getAdjustedFaceIndex(faceIndex);

    texture = self.getTexture(terrainType, index);
    texture2 = self.getTexture(terrainType, index+1);

    self.geometry.faceVertexUvs[0][index] = texture;
    self.geometry.faceVertexUvs[0][index+1] = texture2;

    self.geometry.uvsNeedUpdate = true;

    return true;
}

