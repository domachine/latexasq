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

function addAnts (root) {
    
    var countAnts = Math.floor(Math.random() * globalsN.MAX_ANTS);
    var ants = new Array(countAnts);
    for(var i = 0; i < countAnts; i++)
        ants[i] = antN.Ant();

    root.ants = ants;
}

function main(){
    root = nodeN.buildPath (5);
    addAnts(root);
    console.info(JSON.stringify(root));
    
    var stdin = process.openStdin();
    require('tty').setRawMode(true);    

    stdin.on('keypress', function (chunk, key) {
        if(key && key.name == 's')
            process.nextTick(function(){
                console.log("step");
                antN.step(root);
                addAnts(root);
                try{
                    console.info(JSON.stringify(root));
                }catch(err){
                    console.error(err);
                    debug(root);
                }
            });
        
        if (key && key.ctrl && key.name == 'c') process.exit();
    });
}

function debug(node){
    try{
        var test = JSON.stringify(node);
        console.log(test);
    }catch(err){
        console.error(err);
        for(var i = 0; i < node.edges.length; i++)
            debug(node.edges[i]);
    }
}

function runTests () {
    buildPathTest ();
}

main ();
