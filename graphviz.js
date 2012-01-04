
exports.save = function(root){
    
    var output = "digraph G {\n";
    output += "\t" + exports.draw(root, undefined, 0);
    output += "\n}";
    
    //var sys = require('sys');
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { /*sys.puts(stdout)*/  }
    
    exec("echo '"+output+"' > tmp", puts);
    exec("dot -Tpng tmp -o graph_" + root.stepcount + ".png", puts);
}


exports.draw = function(node, fathernodetext, depth){
    var nodetext = "\"Node " + node.id + "\\n(Ants: " + node.ants.length + "/" + node.antsOnHomerun.length + ")\"";
    var output = "";
    for(var i in node.edges){
        output += exports.draw(node.edges[i], nodetext, depth+1);
    }
    if(fathernodetext !== undefined)
        return fathernodetext + " -> " + nodetext + " [label="+node.pheromone+"];\n\t "+output;
    else
        return "\n\t "+output;
    
}
