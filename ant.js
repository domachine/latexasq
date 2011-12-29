// Intention states of the ants.

function Ant () {
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

    var random = Math.floor(Math.random() * m) + n:
    var frontier = n + ( m/n );
    return (random > frontier) ? n : m;
}

function step (root) {
    var _process = function (node) {
        for (var i in node.ants) {
            
            var ant = node.ants[i];
            var nextNode = undefined;
            if(ant.searching === true){
                nextNode = nextNode(ant, node);

                if (nextNode == undefined){
                    //ant arrived at end of graph
                    ant.searching = false;
                    //remove last Node, for going home
                    ant.returnPath.pop();
                }else{
                    //set ant on next node
                    nextNode.ants.push(ant);
                    node.ants[i] = undefined;

                    ant.returnPath.push(nextNode);
                }
            }else{
                //ant is on way back home
                nextNode = ant.returnPath.pop();
                
                nextNode.ants.push(ant);
                node.ants[i] = undefined;
            }
            
            //increase pheromone
            if(nextNode !== undefined){
                nextNode.pheromone += 1;
            }
        }
        //reorder ants in array
        var ants = new Array();
        for (var i in node.ants){
            var ant = node.ants[i];
            if(ant != undefined){
                ants.push(ant);
            }
        }
        node.ants = ants;
        
        for (var i in node.edges)
            //recursive process subnodes
            _process(node.edges[i]);
    };
    
    _process (root);
}

//n + (m/n) zum festlegen der Grenze,
//dann p zwischen n und m ausrechen,
//anhand von näherem wert entscheiden
//bei mehr als 2 Kindern, zufällig immer zu zwei gruppieren.
//problemchen: 2 pheromonstärken gleich!