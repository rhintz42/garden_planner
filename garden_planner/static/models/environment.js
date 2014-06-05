/*
    PUT OPERATION STUFF INTO LIB
    
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

    this._initCamera = function() {
        this._camera.init();
    }

    this._initObjects = function() {
        var self = this;

        self._scene = new Scene();
        self._camera = new Camera();
        self._renderer = new Renderer();
        self._projector = new Projector();
    }

    /*
    The main thing is to keep this class as a Restful API
    Have an `initPlantMethods` function that will initialize all methods
        relating to plants
        * Do the same for terrain

    this.getPlants = function(plant_ids) {
        //get and return all the plants that match the plant_ids.
        //If nothing was passed in, return all of the plants stored in the class
    }

    this.getPlant = function(plant_id) {
        //get and return plant
    }
    */

    this._initProjector = function() {
        this._projector.init(this);
    }

    this._initRenderer = function() {
        this._renderer.init();
    }

    this._initScene = function() {
        this._scene.init();
    }

    this._initVariables = function ab() {
        this._initObjects();

        this._initScene();
        this._initCamera();   
        this._initRenderer();
        this._initProjector();
        this._intersectorCurrent = null;
        this._mouseMoved = false;

        this._animatedObjects = [];
        this._objects = []

        this._stats = new Stats();
        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.top = '0px';
        document.body.appendChild( this._stats.domElement );
    }

    this.addObjToLists = function(obj) {
        this._objects.push(obj);

        if(typeof obj.animate === 'function') {
            this._animatedObjects.push(obj);
        }
    }

    this.addObjToScene = function( obj ) {
        var self = this;

        this._scene.add( obj );
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

    this.animate = function() {
        var self = this,
            i;

        for(i = 0; i < self._animatedObjects.length; i++) {
            self._animatedObjects[i].animate();
        }
    }

    this.getCamera = function() {
        return this._camera;
    }

    this.getRenderer = function() {
        return this._renderer;
    }

    this.getRollOverObj = function() {
        return this._rollOverObj;
    }

    this.getScene = function() {
        return this._scene;
    }

    this.hasMouseMoved = function() {
        return this._mouseMoved;
    }

    this.init = function() {
        var self = this;

        self._initVariables();

        self._rollOverObj = self.addPlant(0,0,-1000, "rollOverObj");
        
        self._terrain = self.addTerrain();
        
        self._mouse2D = new THREE.Vector3( 0, 10000, 0.5 );

        document.addEventListener( 'mousemove', self.onDocumentMouseMove.bind(self), false );
        document.addEventListener( 'mousedown', self.onDocumentMouseDown.bind(self), false );
        self.setMouseMoved( false );
    }

    this.onDocumentMouseDown = function( event ) {
        var self = this;

        event.preventDefault();

        self._mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        self._mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        self._intersectorCurrent = self._projector.getIntersector( self._mouse2D, self._camera, self._objects, self._rollOverObj );

        type = "setTexture";
        
        if(type === "setTexture") {
            self._terrain.setFaceTexture(self._intersectorCurrent, 'brick');
        } else if (type === "groundUp") {
            self._terrain.setFaceHeight(self._intersectorCurrent, 50, type);
        } else if (type === "groundDown") {
            self._terrain.setFaceHeight(self._intersectorCurrent, -50, type);
        }

        
        
        self.setMouseMoved( true );

    }

    this.onDocumentMouseMove = function( event ) {
        var self = this;

        event.preventDefault();

        self._mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        self._mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        self.setMouseMoved( true );

    }

    this.getHeightFromIntersector = function(intersector, point) {
        return this._terrain.getHeightFromIntersector(intersector, point);
    }

    this.getStep = function() {
        return this._terrain.getStep();
    }

    this.render = function() {
        var self = this;

        self._renderer.render(self._scene, self._camera);
    }

    // currentIntersector.set
    this.setIntersectorCurrent = function() {
        var self = this;

        if(self.hasMouseMoved()) {
            self._intersectorCurrent = self._projector.getIntersector( self._mouse2D, self._camera, self._objects, self._rollOverObj );
            self.setMouseMoved( false );
        } 
    }

    this.setMouseMoved = function( hasMouseMoved ) {
        this._mouseMoved = hasMouseMoved;
    }

    this.setRolloverObj = function() {
        var self = this;

        if ( self._intersectorCurrent ) {
            self._projector.setRolloverPosition( self._intersectorCurrent );
            self._rollOverObj.position = self._projector.getRolloverPosition();
        } else {
            self._rollOverObj.position = self._projector.getOutOfViewPosition();
        }
    }

    this.updateStats = function() {
        this._stats.update();
    }

    this.init();
}
