window.jazzmine = (function(){
	var jasmine_describe = describe,
		jasmine_it = it,
		jasmine_beforeEach = beforeEach,
		jasmine_afterEach = afterEach;

	function mockTests(mocks, dependencies, name, method){
		moquire(mocks, dependencies, function(){
			var modules = arguments;
			jasmine_describe(name, function(){
				method.apply(this, modules);
			});
		});
	}
	function runTests(dependencies, name, method){
		moquire(dependencies, function(){
			var modules = arguments;
			jasmine_describe(name, function(){
				method.apply(this, modules);
			});
		});
	}

	describe = overload([String, Function], function(name, method){
		jasmine_describe(name, method);
	}).when([Array, String, Function], function(dependencies, name, method){
		runTests(dependencies, name, method);
	}).when([Object, Array, String, Function], function(mocks, dependencies, name, method){
		mockTests(mocks, dependencies, name, method);
	}).when([String, Array, Function], function(name, dependencies, method){
		runTests(dependencies, name, method);
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
		require.config(moquire.config(config));
	}

	jazzmine.onReady = function(then){
		moquire.then(then);
	}

	return jazzmine;

})();