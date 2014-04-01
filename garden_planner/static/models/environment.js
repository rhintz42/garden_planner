/*
    Things todo
    * Clean up Code and put more stuff into their own models and such
        * Start with adding the Plant stuff
    * Put scene, camera, and renderer in their own classes
    * The intersecting of plant objects should not count
        * Check the type of object
*/
function Environment() {
    var _scene,
        _camera,
        _renderer,
        _projector, //Create a projector model
        _stats,
        _objects;   //Should have all objects (including terrain) in here
                    //Should add 'objectsWithAnimation' that add objects w/ animate()
                    //Should add 'objectsMoveable' or something for objects can move

    // Put most of these into the Plant Model
    var voxelPosition,
        tmpVec,
        normalMatrix,
        rollOverMesh,
        rollOverMaterial,
        rollOverGeo;

    // Put this into the projector Model
    var mouse2D;
    
    
    //Put this into another file called "events"
    function onDocumentMouseMove( event ) {

        event.preventDefault();

        mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }
    
    // Most of this should be set in the plant class
    function setVoxelPosition( intersector ) {

        if ( intersector.face === null ) {
            console.log( intersector )
        }

        normalMatrix.getNormalMatrix( intersector.object.matrixWorld );

        tmpVec.copy( intersector.face.normal );
        tmpVec.applyMatrix3( normalMatrix ).normalize();

        voxelPosition.addVectors( intersector.point, tmpVec );
        voxelPosition.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

    }
    
    // This should be in the projector class
    function getRealIntersector( intersects ) {

        for( i = 0; i < intersects.length; i++ ) {
            intersector = intersects[ i ];
            if ( intersector.object != rollOverMesh ) {
                return intersector;
            }
        }

        return null;

    }
    
    function render() {
        var i;
        requestAnimationFrame(render);

        // Should be in like a projector class
        raycaster = _projector.pickingRay( mouse2D.clone(), _camera );

        var intersects = raycaster.intersectObjects( _objects );
        if ( intersects.length > 0 ) {
            intersector = getRealIntersector( intersects );

            if ( intersector ) {
                setVoxelPosition( intersector );
                rollOverMesh.position = voxelPosition;
            }
        }
        //------------------------------------------------------------

        _renderer.render(_scene, _camera);
        _stats.update();
    }

    function initRenderer() {
        _renderer.initRenderer();
    }

    function initScene() {
        _scene.initScene();
    }

    function initObjects() {
        _scene = new Scene();
        _camera = new Camera();
        _camera.initCamera();
        _camera2 = new Camera();
        _camera2.position.x = 3422;
        _renderer = new Renderer();
    }

    function initCamera() {
        _camera.initCamera();
    }

    function initVariables() {
        initObjects();

        initScene();
        initCamera();   
        initRenderer();

        _objects = []

        _stats = new Stats();
        _stats.domElement.style.position = 'absolute';
        _stats.domElement.style.top = '0px';
        document.body.appendChild( _stats.domElement );
    }

    this.init = function() {
        initVariables();

        voxelPosition = new THREE.Vector3();
        tmpVec = new THREE.Vector3();
        normalMatrix = new THREE.Matrix3();
        _projector = new THREE.Projector();
        
        
        // This should be in the plant class & Make the starting position somewhere far away so can't see at first
        rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
        rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
        rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
        //-----------------------------------------------------------------------------------------------------
        _scene.add( rollOverMesh );
        
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

    this.addObj = function(obj) {
        _scene.add(obj.getObj());
        _objects.push(obj.getObj());
    }

    this.addPlant = function(x, y, z) {
        var plant = new Plant(x, y, z);
        this.addObj(plant);
    }

    this.addTerrain = function() {
        var terrain = new Terrain();
        _scene.add(terrain.getLines());
        _scene.add(terrain.getObj());
        _objects.push(terrain.getObj());
    }

    this.init();
}
