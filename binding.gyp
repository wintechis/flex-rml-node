{
  "targets": [
    {
      "target_name": "nodeFlex",
      "sources": [
        "src/FlexRML.cpp",
        "src/base64.cpp",
        "src/byte_source.cpp",
        "src/conversion.cpp",
        "src/csv_reader.cpp",
        "src/custom_io.cpp",
        "src/env.cpp",
        "src/flexinput.cpp",
        "src/n3.cpp",
        "src/node.cpp",
        "src/rdf_parser.cpp",
        "src/rdf_vector_helper.cpp",
        "src/reader.cpp",
        "src/rml_extractor.cpp",
        "src/string.cpp",
        "src/string_helper.cpp",
        "src/system.cpp",
        "src/termtype_helper.cpp",
        "src/uri.cpp",
        "src/writer.cpp"
      ],
      "cflags": [
        "-O3",
        "-fexceptions"
      ],
      "cflags_cc": [
        "-O3",
        "-fexceptions"
      ],
      "ldflags": [
        "-O3",
        "-fexceptions"
      ]
    }
  ]
}