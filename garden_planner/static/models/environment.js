/*
    Things todo
    * Put Mouse stuff into Projector Model
    * Fix up the Plant class so that the addToScene stuff looks better
    * Clean up the classes so that they are in different sections
    * Add comments to all of the classes/functions
    * Create Diagram of everything to keep track of what I'm doing
    * Look into adding tests
    * Create another plant mesh object
*/
function Environment() {
    var _scene,
        _camera,
        _renderer,
        _projector, 
        _stats,
        _rollOverObj,
        _objects,   //Should have all objects (including terrain) in here
        _animatedObjects;
                    //Should add 'objectsMoveable' or something for objects can move

    // Put this into the projector Model
    var mouse2D;
    
    
    //Put this into Projector
    function onDocumentMouseMove( event ) {

        event.preventDefault();

        mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }
    
    function render() {
        var i,
            intersector;

        requestAnimationFrame(render);

        for(i = 0; i < _animatedObjects.length; i++) {
            _animatedObjects[i].animate();
        }

        intersector = _projector.getIntersector( mouse2D.clone(), _camera,
                                                 _objects, _rollOverObj);

        if ( intersector ) {
            _projector.setRolloverPosition( intersector );
            _rollOverObj.position = _projector.getRolloverPosition();
        }

        _renderer.render(_scene, _camera);
        _stats.update();
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

        _objects = []
        _animatedObjects = []

        _stats = new Stats();
        _stats.domElement.style.position = 'absolute';
        _stats.domElement.style.top = '0px';
        document.body.appendChild( _stats.domElement );
    }

    this.init = function() {
        this.initVariables();

        _rollOverObj = this.addPlant(0,0,-1000, "rollOverObj");
        
        // Put this into the projector Model
        mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
        
        this.addTerrain();
        render();
        
        
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
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

    this.addObjToLists = function(obj) {
        _objects.push(obj);

        if(typeof obj.animate === 'function') {
            _animatedObjects.push(obj);
        }
    }

    this.addPlant = function(x, y, z, type) {
        var self = this,
            plant = new Plant(self, x, y, z, type);

        return plant;
    }

    this.addTerrain = function() {
        var self = this,
            terrain = new Terrain();

        terrain.addToScene(_scene);

        self.addObjToLists(terrain);
    }

    this.init();
}
