var Q = require('q');

module.exports = function(arr, cb){

    var deffered = Q.defer();
    var flattendList = [];

    if(!arr || arr.constructor !== Array){
        deffered.reject("Not a valid argument. Must be non null and an Array");
        deffered.promise.nodeify(cb);
        return deffered.promise;
    }

    while(arr.length > 0) {
        if (arr[0] && typeof arr[0] == 'number' && arr[0] % 1 == 0) {
            flattendList.push(arr.shift());
        } else if (arr[0] && arr[0].constructor === Array) {
            arr = arr.shift().concat(arr);
        } else {
            deffered.reject("Illegal object found in the array. Only integers or arrays of integers are permitted.");
            break;
        }
    }
    deffered.resolve(flattendList);
    deffered.promise.nodeify(cb);
    return deffered.promise;
};