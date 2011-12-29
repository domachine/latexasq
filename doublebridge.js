#!/usr/bin/node


function main (leftDepth, rightDepth, nAnts) {
    var root = Node (buildPath (leftDepth), buildPath (rightDepth));

    for (var i = 0; i < nAnts; ++i)
        root.ants.push (Ant (true, root));
}
