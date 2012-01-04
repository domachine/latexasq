// Intention states of the ants.

exports.Ant = function () {
    return {
        searching: true,
        returnPath: [],
        stepcount: 0
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
    if(nEdges == 0)
        return undefined;
    
    var edges = copy(node.edges);

    edges.sort ();
    
    // Fill array.
    for (var i in edges) {
        if(edges[i] === undefined)
            continue;
        var edge = edges[i];

        var pheromone = edge.pheromone;
        if(pheromone == 0)//use 1 instead for no calc issues
            pheromone = 1;
        a.push (pheromone + sum);
        sum += (pheromone + sum);
    }

    random = Math.floor(Math.random() * (a[a.length-1]+1));//generates random int between 0 and sum

    for (var i in edges) {
        if(edges[i] === undefined)
            continue;
        
        if (a[i] >= random)
            return edges[i];
    }
    console.log("nextnode undefined!");//BUG BUG BUG THIS NEVER EVER SHOULD HAPPEN
    console.info("rang: 0-"+sum);
    console.info("random: "+random);
    console.info(edges);
    console.info(a);
    return undefined;
}

exports.step = function (root) {
    var stepcount = root.stepcount++;

    var _process = function (node) {
        for (var i in node.ants) {
            //just forward gooing ants
            var ant = node.ants[i];
            
            if(ant.stepcount > stepcount)
                continue;
            ant.stepcount++;

            var next = nextNode(ant, node);
            if(next !== undefined){
                //set ant on next node
                next.ants.push(ant);
                node.ants[i] = undefined;

                ant.returnPath.push(node);
                next.pheromone++;
            }else{
                //ant at leaf node => go home!
                node.antsOnHomerun.push(ant);
                node.ants[i] = undefined;
            }
        }
        
        for (var i in node.antsOnHomerun){
            //just homerunning ants
            var ant = node.antsOnHomerun[i];
            
            if(ant.stepcount > stepcount)
                continue;
            ant.stepcount++;
    
            next = ant.returnPath.pop();
            if(next !== undefined){
                next.antsOnHomerun.push(ant);
            }
            
            node.antsOnHomerun[i] = undefined;
            node.pheromone++;
        }

        if(node.ants.length != 0){
            //reorder ants in array
            var ants = new Array();
            for (var i in node.ants){
                var ant = node.ants[i];
                if(ant !== undefined){
                    ants.push(ant);
                }
            }
            node.ants = ants;
        }
        
        if(node.antsOnHomerun.length != 0){
            //reorder ants in array
            var ants = new Array();
            for (var i in node.antsOnHomerun){
                var ant = node.antsOnHomerun[i];
                if(ant !== undefined){
                    ants.push(ant);
                }
            }
            node.antsOnHomerun = ants;
        }

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