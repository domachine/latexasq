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
            if (true){
	      //entscheiden, wo ameise hingeht
	      
	      //ameise von node nehmen
	      //ameise auf node setzten
	      //returnPath von ameisen anpassen
	      //pheromonspur hinzufügen
            }
        }
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