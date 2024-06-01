#include "flexinput.h"

std::string process_input(std::map<std::string, std::string>& input_data, std::string& rml_mapping) {
    std::string res;
    
    std::unordered_set<NQuad> generated_quads = map_data(rml_mapping, input_data);


    for (const NQuad& quad : generated_quads) {
        res +=quad.subject.c_str();
        res +=" ";
        res += quad.predicate.c_str();
        res += " ";
        res += quad.object.c_str();
        res += " ";
        res += quad.graph.c_str();
        res +=" .\n";
    } 
    return res;
}