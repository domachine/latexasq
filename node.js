var id = 0;
// Represents a node in the path.
function Node (edges) {
    id++;
    return {
        edges: new Array (edges),
        pheromone: 0,
        ants: new Array(),
        antsOnHomerun: new Array(),
        id: id
    };
}

exports.buildPath = function (depth) {
    var _buildPath = function (depth) {
        if (depth === 0) {
            return undefined;
        }
        else {
            // Build new Node and put it into the
            // chain.
            var countChilds = Math.floor(Math.random() * globalsN.MAX_CHILDS);
            if(depth === 1)//is leafnode
                countChilds = 0;
            
            var newNode = Node (countChilds);
            for( var i = 0; i < countChilds; i++ )
                // Recursive call.
                newNode.edges[i] = _buildPath (depth - 1);

            return newNode;
        }
    };

    var root = _buildPath (depth);
    root.stepcount = 0;
    
    return root;
}
