function GardenPlanner() {

    this.init = function() {
        this._environment = new Environment();
        this.render();
    }

    this.getEnvironment = function() {
        return this._environment;
    }
    
    //function render() {
    this.render = function(self) {
        var self = this,
            environment = this._environment;


        requestAnimationFrame(this.render.bind(self));

        environment.animate();
        environment.setIntersectorCurrent();
        environment.setRolloverObj();

        environment.render();
        environment.updateStats();
    }

    this.init();
}
