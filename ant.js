// Intention states of the ants.

exports.Ant = function () {
    return {
        searching: true,
        returnPath: []
    };
}

// Generates an intention based on the numeric left and right.
function intention (n, m) {
    if(n > m){
      var tmp = n;
      n = m;
      m = tmp;
    }

    var random = Math.floor(Math.random() * m) + n;
    var frontier = n + ( m/n );
    return (random > frontier) ? n : m;
}

function copy(array) {
    var newArray = new Array (array.length);

    for (var i in array)
        newArray[i] = array[i];

    return newArray;
}

/*
  Does all the dirty probability work and returns the node where the
  ant should go next.

  @param ant The ant for we have to decide where to go.
  @param node The node the ant currently resides on.
 */
function nextNode (ant, node) {
    var a = [];
    var sum = 0;
    var random;
    var nEdges = node.edges.length;
    var edges = copy(node.edges);

    edges.sort ();

    // Fill array.
    for (var i in edges) {
        if(edges[i] === undefined)
            continue;
        var edge = edges[i];

        a.push (edge.pheromone + sum);
        sum += (edge.pheromone + sum);
    }

    random = Math.floor(Math.random() * sum);

    for (var i in edges) {
        if(edges[i] === undefined)
            continue;
        if (edges[i].pheromone <= a[i])
            return edges[i];
    }

    return undefined;
}

exports.step = function (root) {
    var _process = function (node) {
        for (var i in node.ants) {

            var ant = node.ants[i];
            var next = nextNode(ant, node);
            if(ant.searching && next !== undefined){
                //set ant on next node
                next.ants.push(ant);
                node.ants[i] = undefined;

                ant.returnPath.push(node);
            }else{
                //ant is on way back home
                ant.searching = false;

                next = ant.returnPath.pop();
                if(next === undefined){
                    //ant back at home => destroy!
                    ant = undefined;
                }else{
                    next.ants.push(ant);
                }
                node.ants[i] = undefined;
            }

            //increase pheromone
            if(next !== undefined){
                next.pheromone += 1;
            }
        }
        //reorder ants in array
        var ants = new Array();
        for (var i in node.ants){
            var ant = node.ants[i];
            if(ant !== undefined){
                ants.push(ant);
            }
        }
         node.ants = ants;

        for (var i in node.edges)
            //recursive process subnodes
            if(node.edges[i] !== undefined)
                _process(node.edges[i]);
    };

    _process (root);
}

//n + (m/n) zum festlegen der Grenze,
//dann p zwischen n und m ausrechen,
//anhand von näherem wert entscheiden
//bei mehr als 2 Kindern, zufällig immer zu zwei gruppieren.
//problemchen: 2 pheromonstärken gleich!