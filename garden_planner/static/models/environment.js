/*
    THE LOOPS AND SUCH IN THIS SHOULD BE A CONTROLLER, NOT A MODEL
        * Make controllers for actions like "edit_terrain" and such
    Things todo
    * Clean up the classes so that they are in different sections
    * Add comments to all of the classes/functions
    * Create Diagram of everything to keep track of what I'm doing
    * Create another plant mesh object

    * Start focusing on the terrain
        * Give the terrain a proper texture
            * Copy from old_garden_planner
        * Be able to edit the terrain to go up
            * If an object there, the object goes up with the ground
        * Be able to edit the terrain to go down
        * Be able to make the terrain not rectangle
        * Be able to edit the terrain to get wider at points
        * Be able to edit the terrain to get narrower at points
    * Start focusing more on Plants
        * Be able to place plants down on the ground
            * Be able to get lower/higher based on the terrain
        * Be able to pick plants back up
        * Be able to remove plants
        * Be able to sense that a plant area is where about to put another plant
            * Show red if this is the case
    * Be able to rotate the camera
    * Terrain should not be a subclass of Mesh
        * Ground and Grid should be subclasses of Terrain and should be created
            from the terrain class
    * Look into adding tests





NOTES:
* Not pur
*/
function Environment() {
    var _scene,
        _camera,
        _renderer,
        _projector, 
        _stats,
        _rollOverObj,
        _objects,   //Should have all objects (including terrain) in here
        _mouse2D,
        _animatedObjects,
        _self;
                    //Should add 'objectsMoveable' or something for objects can move
    
    function render() {
        var self = this,
            i;

        requestAnimationFrame(render);

        for(i = 0; i < _animatedObjects.length; i++) {
            _animatedObjects[i].animate();
        }

        if(hasMouseMoved()) {
            self._intersectorCurrent = _projector.getIntersector( _mouse2D, _camera, _objects, _rollOverObj );
            setMouseMoved( false );
        } 

        if ( self._intersectorCurrent ) {
            _projector.setRolloverPosition( self._intersectorCurrent );
            _rollOverObj.position = _projector.getRolloverPosition();
        } else {
            _rollOverObj.position = _projector.getOutOfViewPosition();
        }

        _renderer.render(_scene, _camera);
        _stats.update();
    }

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

    this.onDocumentMouseDown = function( event ) {
        var self = _self;

        event.preventDefault();

        _mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        _mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        self._intersectorCurrent = _projector.getIntersector( _mouse2D, _camera, _objects, _rollOverObj );
        
        //self._terrain.getPointClosestTo(self._intersectorCurrent);
        self._terrain.setFaceMaterial(self._intersectorCurrent, 'grass');
        
        setMouseMoved( true );

    }

    this._initCamera = function() {
        _camera.init();
    }

    this._initRenderer = function() {
        _renderer.init();
    }

    this._initScene = function() {
        _scene.init();
    }

    this._initProjector = function() {
        _projector.init(this);
    }

    this._initObjects = function() {
        var self = this;

        _scene = new Scene();
        _camera = new Camera();
        _renderer = new Renderer();
        _projector = new Projector();
    }

    this.initVariables = function() {
        this._initObjects();

        this._initScene();
        this._initCamera();   
        this._initRenderer();
        this._initProjector();
        this._intersectorCurrent = null;
        _self = this;

        _objects = []
        _animatedObjects = []

        _stats = new Stats();
        _stats.domElement.style.position = 'absolute';
        _stats.domElement.style.top = '0px';
        document.body.appendChild( _stats.domElement );
    }

    this.init = function() {
        var self = this;

        self.initVariables();

        _rollOverObj = self.addPlant(0,0,-1000, "rollOverObj");
        
        self._terrain = self.addTerrain();
        
        _mouse2D = new THREE.Vector3( 0, 10000, 0.5 );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mousedown', self.onDocumentMouseDown, false );
        setMouseMoved( false );

        render();
    }

    this.getScene = function() {
        return _scene;
    }

    this.getCamera = function() {
        return _camera;
    }

    this.getRenderer = function() {
        return _renderer;
    }

    this.getRollOverObj = function() {
        return _rollOverObj;
    }

    this.addToLists = function(obj) {
        _objects.push(obj);

        if(typeof obj.animate === 'function') {
            _animatedObjects.push(obj);
        }
    }

    this.addToScene = function( obj ) {
        var self = this;

        _scene.add( obj );
    }

    this.addPlant = function(x, y, z, type) {
        var self = this,
            plant = new Plant(self, x, y, z, type);

        return plant;
    }

    this.addTerrain = function() {
        var self = this,
            terrain = new Terrain(self);

        return terrain;
    }

    this.init();
}
