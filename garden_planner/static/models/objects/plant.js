/*
    * Should have Object class that contains _geometry, _material, and _obj
        that all objects inherit from
*/
function Plant(environment, x, y, z, type) {
    var self = this,
        geometry,
        material,
        objFile,
        loader;

    material = _getShading( type );
    objFile = _getObjFile();
    self.environment = environment;

    self.loadObj(x, y, z, objFile, material, geometry);

    if(self.objectLoaded === undefined) {
        self.objectLoaded = false;
    }
    self.turnAnimationOn();
}

//-------------------------------- Private Functions ----------------------

function _getShading( type ) {
    var material;

    if(type === "rollOverObj") {
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
    } else {
        material = new THREE.MeshNormalMaterial();
    }

    material.shading = THREE.SmoothShading;

    return material;
}

function _getObjFile() {
    var objFile;

    objFile = '/static/monkey.js';

    return objFile;
}

extend(THREE.Mesh, Plant);

// ----------------------------- Private Methods -----------------------------

Plant.prototype._addToEnvironment = function() {
    var self = this;

    self.environment.addObjToScene(self);
    self.environment.addObjToLists(self);
}

// ------------------------------ loadObj Method ------------------------------

Plant.prototype.loadObj = function(x, y, z, objFile, material, geometry) {
    var self = this,
        loader;

    loader = new THREE.JSONLoader();
    loader.load( objFile, function ( geometry ) {
        geometry.computeVertexNormals();

        THREE.Mesh.call( self, geometry, material )
        self.position.set(x, y, z);
        self.scale.x = self.scale.y = self.scale.z = 50;
        self.rotation.y = Math.PI;
        self.matrixAutoUpdate = true;
        
        self._addToEnvironment();
        
        self.objectLoaded = true;
    } );
}

//--------------------------- addToScene Method ------------------------

Plant.prototype.hasObjectLoaded = function() {
    var self = this;
    
    return self.objectLoaded;
}


//-------------------------- Animation Methods -------------------------

Plant.prototype.animate = function() {
    var self = this;

    if(self.hasObjectLoaded()) {
        self.rotation.y += 0.01;
    }
}

Plant.prototype.turnAnimationOff = function() {
    var self = this;

    self.animationOn = false;
}

Plant.prototype.turnAnimationOn = function() {
    var self = this;

    self.animationOn = true;
}

Plant.prototype.toggleAnimation = function() {
    var self = this;

    if(self.animationOn) {
        self.turnAnimationOff();
    } else {
        self.turnAnimationOn();
    }
}
