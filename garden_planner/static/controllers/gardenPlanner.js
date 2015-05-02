function GardenPlanner(container_id) {

    this.init = function(container_id) {
        this._environment = new Environment(container_id);
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

    this.init(container_id);
}
