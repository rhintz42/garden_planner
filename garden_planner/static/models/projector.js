function Projector() {
    THREE.Projector.call(this);
}

extend(THREE.Projector, Projector);

//--------------------------------- Initializers -----------------------------

Projector.prototype.init = function(environment) {
    var self = this;

    self._environment = environment;
    self._rolloverPosition = new THREE.Vector3();
    self._outOfViewPosition = new THREE.Vector3( 0, 0, -100000);
    self._tmpVec = new THREE.Vector3();
    self._normalMatrix = new THREE.Matrix3();
    self._intersector = undefined;
}

//------------------------------ Private Functions ----------------------------


//------------------------------ Private Methods ------------------------------

Projector.prototype._getRealIntersector = function( intersects, rollOverObj ) {
    var self = this;

    for( i = 0; i < intersects.length; i++ ) {
        intersector = intersects[ i ];
        if ( intersector.object != rollOverObj ) {
            return intersector;
        }
    }

    return null;
}

//------------------------------ Public Methods -------------------------------

Projector.prototype.getIntersector = function( mouse2D, camera, objects, rollOverObj ) {
    var self = this,
        raycaster,
        intersects;
        
    // Need to have this copy of mouse2D because `self.pickingRay`
    //  destructively modifies the mouse vector given to it
    var tmpMouse2D = new THREE.Vector3().copy(mouse2D);

    raycaster = self.pickingRay( tmpMouse2D, camera );

    intersects = raycaster.intersectObjects( objects );
    
    if ( intersects.length > 0 ) {
        self._intersector = self._getRealIntersector( intersects, rollOverObj );
    } else {
        self._intersector = null;
    }

    return self._intersector;
}

Projector.prototype.getOutOfViewPosition = function() {
    var self = this;

    return self._outOfViewPosition;
}

Projector.prototype.getRolloverPosition = function() {
    var self = this;

    return self._rolloverPosition;
}

Projector.prototype.setRolloverPosition = function( intersector ) {
    var self = this,
        step;

    step = self._environment.getStep();

    if ( intersector.face === null ) {
        console.log( intersector )
    }

    self._normalMatrix.getNormalMatrix( intersector.object.matrixWorld );

    self._tmpVec.copy( intersector.face.normal );
    self._tmpVec.applyMatrix3( self._normalMatrix ).normalize();

    self._rolloverPosition.addVectors( intersector.point, self._tmpVec );

    // This is the part that will go every 50. If you want it to be smooth,
    //  comment this out
    self._rolloverPosition.divideScalar( step ).floor().multiplyScalar( step ).addScalar( step/2 );

    self._rolloverPosition.y = self._environment.getHeightFromIntersector(intersector, self._rolloverPosition);
}
