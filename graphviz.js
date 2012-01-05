
exports.save = function(root, id){
    
    var output = "digraph G {\n";
    output += "\t" + exports.draw(root, undefined, 0);
    output += "\n}";
    
    //var sys = require('sys');
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { /*sys.puts(stdout)*/  }
    
    var filename = "graph_" + id + "_" + root.stepcount;
    exec("echo '"+output+"' > " + filename + ".dot", puts);
    exec("dot -Tpng " + filename + ".dot -o " + filename + ".png", puts);
}


exports.draw = function(node, fathernodetext, depth){
    var nodetext = "\"Node " + node.id + "\\n(Ants: " + node.ants.length + "/" + node.antsOnHomerun.length + ")\"";
    var output = "";
    for(var i in node.edges){
        output += exports.draw(node.edges[i], nodetext, depth+1);
    }
    var color = "";
    var normalstyle = "";
    if(node.edges.length == 0){
        color = nodetext + " [style=filled,color=\"gray\"];\n\t";
    }
    if(fathernodetext !== undefined)
        return color + fathernodetext + " -> " + nodetext + " [label=" + node.pheromone + "];\n\t " + normalstyle + output;
    else
        return "\n\t "+output;
    
}
