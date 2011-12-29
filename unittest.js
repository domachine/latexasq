// Unit testing
function assert (cond) {
    if (! cond ())
        error ("condition failed: " + cond);
}

function buildPathTest () {
    var path = buildPath (5);

    var testNode = function (node, pathDepth) {
        if (pathDepth == 0)
            assert (function () {node.right === undefined});
        else
            assert (function () {node.right !== undefined});
    };
}

function stepTest () {
    var path = buildPath (5);


}

function runTests () {
    buildPathTest ();
}

runTests ();
