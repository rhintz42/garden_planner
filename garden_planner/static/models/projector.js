function Projector() {
    var _mouse2D,
        _mouseMoved;

    THREE.Projector.call(this);
}

extend(THREE.Projector, Projector);

//--------------------------------- Initializers -----------------------------

Projector.prototype.init = function(environment) {
    var self = this;

    self._environment = environment;
    self._rolloverPosition = new THREE.Vector3();
    self._outOfViewPosition = new THREE.Vector3( 0, 0, -1000);
    self._tmpVec = new THREE.Vector3();
    self._normalMatrix = new THREE.Matrix3();
    self._intersector = undefined;

    _mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
    setMouseMoved( false );
        
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

//------------------------------ Private Functions ----------------------------

function hasMouseMoved() {
    return _mouseMoved;
}

function setMouseMoved( hasMouseMoved ) {
    _mouseMoved = hasMouseMoved;
}

function onDocumentMouseMove( event ) {
    event.preventDefault();

    _mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    _mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    setMouseMoved( true );

}

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

Projector.prototype.getIntersector = function( camera, objects, rollOverObj ) {
    var self = this,
        raycaster,
        intersects;
        
    raycaster = self.pickingRay( _mouse2D, camera );

    if(hasMouseMoved()) {
        intersects = raycaster.intersectObjects( objects );
        
        if ( intersects.length > 0 ) {
            self._intersector = self._getRealIntersector( intersects, rollOverObj );
        } else {
            self._intersector = null;
        }
    }

    setMouseMoved( false );
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
