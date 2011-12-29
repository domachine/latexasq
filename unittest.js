// Unit testing

globalsN = require('./globals.js');
antN = require('./ant.js');
nodeN = require('./node.js');

function assert (cond) {
    if (! cond ())
        error ("condition failed: " + cond);
}

function buildPathTest () {
    var path = nodeN.buildPath (5);

    var testNode = function (node, pathDepth) {
        if (pathDepth == 0)
            assert (function () {node.right === undefined});
        else
            assert (function () {node.right !== undefined});
    };
}

function stepTest (root) {
    
    var countAnts = Math.floor(Math.random() * globalsN.MAX_ANTS);
    var ants = new Array(countAnts);
    for(var i = 0; i < countAnts; i++)
        ants[i] = ant.Ant();
    root.ants = ants;
    
    step(root);
}

function main(){
    var root = buildPath (5);

    require('tty').setRawMode(true);    
    var stdin = process.openStdin();

    stdin.on('keypress', function (chunk, key) {
        process.nextTick(function(){
            stepTest(root);
        });
        
        if (key && key.ctrl && key.name == 'c') process.exit();
    });
}

function runTests () {
    buildPathTest ();
}

main ();
