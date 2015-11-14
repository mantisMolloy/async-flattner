var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var flatten = require('../index');


it('argument: null, expect: rejected', function(){
    argument = null;
    expected = "Not a valid argument. Must be non null and an Array";

    var result = flatten(argument);
    return expect(result).to.be.rejectedWith(expected);
});


it('argument: non array argument, expect: rejected', function(){
    argument = "hello cruel world";
    expected = "Not a valid argument. Must be non null and an Array";

    var result = flatten(argument);
    return expect(result).to.be.rejectedWith(expected);
});


it('argument: nested null, expect: rejected', function(){
    argument = [1,2,null];
    expected = "Illegal object found in the array. Only integers or arrays of integers are permitted.";

    var result = flatten(argument);
    return expect(result).to.be.rejectedWith(expected);
});


it('argument: nested non integer, expect: rejected', function(){
    argument = [1,2,[3.5]];
    expected = "Illegal object found in the array. Only integers or arrays of integers are permitted.";

    var result = flatten(argument);
    return expect(result).to.be.rejectedWith(expected);
});


it('argument: flat list, expect: flat list', function(){
    argument = [1,2,3];
    expected = [1,2,3];

    var result = flatten(argument);
    return expect(result).to.eventually.deep.equal(expected);
});


it('argument: simple nested list, expect: flat list', function(){
    argument = [1,2,[3]];
    expected = [1,2,3];

    var result = flatten(argument);
    return expect(result).to.eventually.deep.equal(expected);
});


it('argument: complex nested list, expect: flat list', function(){
    argument = [1,2,[3,4,5,[6,7,8,[9,10]]],11,12];
    expected = [1,2,3,4,5,6,7,8,9,10,11,12];

    var result = flatten(argument);
    return expect(result).to.eventually.deep.equal(expected);
});