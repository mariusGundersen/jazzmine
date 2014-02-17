window.jazzmine = (function(moquire, jasmine_describe, jasmine_it, jasmine_beforeEach, jasmine_afterEach){

	function mockTests(mocks, dependencies, name, method){
		moquire(mocks, dependencies, function(){
			var modules = arguments;
			jasmine_describe(name, function(){
				method.apply(this, modules);
			});
		});
	}
	function runTests(dependencies, name, method){
		moquire({}, dependencies, function(){
			var modules = arguments;
			jasmine_describe(name, function(){
				method.apply(this, modules);
			});
		});
	}

	describe = overload([String, Function], function(name, method){
		jasmine_describe(name, method);
	}).when([Array, String, Function], function(dependencies, name, method){
		mockTests({}, dependencies, name, method);
	}).when([Object, Array, String, Function], function(mocks, dependencies, name, method){
		mockTests(mocks, dependencies, name, method);
	}).when([String, Array, Function], function(name, dependencies, method){
		mockTests({}, dependencies, name, method);
	}).when([String, Object, Array, Function], function(name, mocks, dependencies, method){
		mockTests(mocks, dependencies, name, method);
	});

	function runAsync(block){

		if(block.length == 0){
			return block;
		}else{
			return function(){
				var self = this;
				var isDone=false;
				function done(){
					isDone=true;
				};
				runs(function(){
					block.call(self, done)
				});
				waitsFor(function(){
					return isDone
				});
			}
		}
	}
	beforeEach = function(block){
		jasmine_beforeEach(runAsync(block))
	};
	because = beforeEach;
	afterEach = function(block){
		jasmine_afterEach(runAsync(block))
	};
	it = function(description,block){
		jasmine_it(description, runAsync(block))
	};


	var jazzmine = {};

	jazzmine.requireConfig = function(config){
		moquire.require.config(moquire.config(config));
	};

	jazzmine.onReady = function(then){
		moquire.then(then);
	};

	jazzmine.addMatchers = overload([Function], function(addMatchers){
		beforeEach(function(done){
			addMatchers(function(matchers){
				this.addMatchers(matchers);
				done();
			}.bind(this));
		});
	}).when([Object], function(matchers){
		beforeEach(function(){
			this.addMatchers(matchers);
		});
	});

	return jazzmine;

})(moquire, describe, it, beforeEach, afterEach);