// Put the Mouse in here
//  The projector should handle all things intersection
function Projector() {
    THREE.Projector.call(this);
}

extend(THREE.Projector, Projector);

Projector.prototype.init = function(environment) {
    var self = this;

    self._environment = environment;
    self._rolloverPosition = new THREE.Vector3();
    self._tmpVec = new THREE.Vector3();
    self._normalMatrix = new THREE.Matrix3();
}

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

Projector.prototype.getIntersector = function( mouse2D, camera, objects, rollOverObj ) {
    var self = this,
        raycaster,
        intersects;
        
    raycaster = self.pickingRay( mouse2D, camera );

    intersects = raycaster.intersectObjects( objects );
    
    if ( intersects.length > 0 ) {
        return self._getRealIntersector( intersects, rollOverObj );
    }
}
    
Projector.prototype.setRolloverPosition = function( intersector ) {
    var self = this;

    if ( intersector.face === null ) {
        console.log( intersector )
    }

    self._normalMatrix.getNormalMatrix( intersector.object.matrixWorld );

    self._tmpVec.copy( intersector.face.normal );
    self._tmpVec.applyMatrix3( self._normalMatrix ).normalize();

    self._rolloverPosition.addVectors( intersector.point, self._tmpVec );
    self._rolloverPosition.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
}

Projector.prototype.getRolloverPosition = function() {
    var self = this;

    return self._rolloverPosition;
}
