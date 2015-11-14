var Q = require('q');


/**
 * Choose to use an iterative approach to avoid stack overflow.
 *
 * The first element of the array is examined on each iteration. If the element is an array the contents of the array
 * are added to the front of a new array :: remaining elements.
 * @param arr
 * @param cb
 * @returns {*|promise}
 */
module.exports = function(arr, cb){

    var deffered = Q.defer();
    var flattendList = [];

    if(!arr || arr.constructor !== Array){
        deffered.reject("Not a valid argument. Must be non null and an Array");
        deffered.promise.nodeify(cb);
        return deffered.promise;
    }

    while(arr.length > 0) {

        //allow flattening of sparse arrays
        if (arr[0] == undefined) {
            arr.shift();
            continue;
        }

        if (typeof arr[0] == 'number' && arr[0] % 1 == 0) {
            flattendList.push(arr.shift());
        } else if (arr[0].constructor === Array) {
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