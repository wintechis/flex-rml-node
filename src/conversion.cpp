#include <emscripten/bind.h>
#include <map>
#include <string>
#include <sstream>

#include "FlexRML.h"


// Function to convert NQuad to string
std::string NQuadToString(const NQuad& nquad) {
  std::ostringstream oss;
  oss << nquad.subject << " "
      << nquad.predicate << " "
      << nquad.object << " "
      << nquad.graph << ".\n";
  return oss.str();
}

// Main processing function
std::string process_input(const std::map<std::string, std::string> &input_data, const std::string &rml_rule) {
  std::string rml = rml_rule;
  std::map<std::string, std::string> input = input_data;

  // Call FlexRML map_data in memory function
  std::unordered_set<NQuad> generated_quads = map_data(rml, input);

  std::string result = "";
  for (const auto& quad : generated_quads) {
    result += NQuadToString(quad);
  }

  return result;
}

std::string Method(const std::map<std::string, std::string> &input_data, const std::string &rml_rule) {
  return process_input(input_data, rml_rule);
}

// Binding code
EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("Method", &Method);
  emscripten::register_map<std::string, std::string>("MapStringString");
}