#!/usr/bin/node


function step (node) {
    var _process = function (node) {
        for (var ant : node.ants) {
            if (
        }

        if (node.right !== undefined)
            _process (node.right);
    };
}

function main (leftDepth, rightDepth, nAnts) {
    var root = Node (buildPath (leftDepth), buildPath (rightDepth));

    for (var i = 0; i < nAnts; ++i)
        root.ants.push (Ant (true, root));
}
