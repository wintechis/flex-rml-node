const flexrml = require("./flexrml")

// sd:name must be key (in TriplesMap1 csv_data_1); data to map must be a string in csv format placed as value
const rmlRule = `@prefix rr: <http://www.w3.org/ns/r2rml#> .
@prefix rml: <http://semweb.mmlab.be/ns/rml#> .
@prefix ql: <http://semweb.mmlab.be/ns/ql#> .
@prefix schema: <http://schema.org/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix sosa: <http://www.w3.org/ns/sosa/> .
@prefix ex: <http://www.example.org/ns/> .
@prefix qudt: <http://qudt.org/vocab/quantity#> .
@prefix sd: <https://w3id.org/okn/o/sd#> .

<TriplesMap1>	
	rml:logicalSource [ rml:source [
              a sd:DatasetSpecification;
              sd:name "csv_data_1";       
            ];
						rml:referenceFormulation ql:CSV 
						];
	rr:subjectMap [ 
    rr:template "http://example.com/observations/observation_{ID}";
    rr:class sosa:Observation
   ];

    rr:predicateObjectMap [ 
		rr:predicate sosa:hasResult ;
		rr:objectMap [
			rr:template "http://example.com/results/result_{ID}"
		];   
	];

  rr:predicateObjectMap [ 
		rr:predicate sosa:resultTime ;
		rr:objectMap [
			rml:reference "DateTime"
		];   
	];

    rr:predicateObjectMap [
		rr:predicate ex:hasEvent;
		rr:objectMap [
			rr:parentTriplesMap <TriplesMap2>;
			rr:joinCondition [
				rr:child "EventID";
				rr:parent "EventID";
			];
		];
	];

	rr:predicateObjectMap [
		rr:predicate sosa:hasResult;
		rr:objectMap [
			rr:parentTriplesMap <TriplesMap3>;
			rr:joinCondition [
				rr:child "DateTime";
				rr:parent "DateTime";
			];
		];
	].	

<TriplesMap2>
  a rr:TriplesMap;

  rml:logicalSource [ 
    rml:source [
              a sd:DatasetSpecification;
              sd:name "csv_data_3";       
            ];
    rml:referenceFormulation ql:CSV
  ];

  rr:subjectMap [ 
    rr:template "http://example.com/events/{EventName}";
  ].

<TriplesMap3>
  a rr:TriplesMap;

  rml:logicalSource [ 
    rml:source [
              a sd:DatasetSpecification;
              sd:name "csv_data_2";       
            ];
    rml:referenceFormulation ql:CSV
  ];

  rr:subjectMap [ 
    rr:template "http://example.com/LightIntensityResults/{DateTime}";
  ];

  rr:predicateObjectMap [ 
    rr:predicate qudt:numericValue ;
    rr:objectMap [ 
        rml:reference "LightIntensity";
        rr:datatype xsd:double 
    ];
  ];

  rr:predicateObjectMap [ 
    rr:predicate qudt:unit ;
    rr:objectMap [ rr:template "https://qudt.org/vocab/unit/LUX"];
  ] .

<TriplesMap4>
  a rr:TriplesMap;
  rml:logicalSource [ 
    rml:source [
              a sd:DatasetSpecification;
              sd:name "csv_data_1";       
            ];
    rml:referenceFormulation ql:CSV
  ];

  rr:subjectMap [ 
    rr:template "http://example.com/results/result_{ID}";
    rr:class qudt:QuantityValue
   ];
	
  rr:predicateObjectMap [ 
    rr:predicate qudt:numericValue ;
    rr:objectMap [ 
        rml:reference "Temperature";
        rr:datatype xsd:double 
    ];
  ];

  rr:predicateObjectMap [ 
    rr:predicate qudt:unit ;
    rr:objectMap [ rr:template "https://qudt.org/vocab/unit/DEG_C" ];
  ] .`;

const csv_data_1 = `ID,DateTime,Temperature,Humidity,EventID
39,2023-01-01T04:43:16,34.413838265086994,76.0409005245794,4
29,2023-01-01T23:59:34,16.479937885209438,65.78909535747226,3
32,2023-01-02T09:35:52,31.6017226242949,45.60799525315551,4
37,2023-01-03T07:27:06,27.110083404427243,71.86182424693132,2
16,2023-01-03T14:40:54,20.42075918870185,58.75401923533224,2
38,2023-01-03T22:47:21,18.891819113646637,42.20488114649753,2
21,2023-01-04T08:09:39,16.24384911367409,67.23599825866529,4
30,2023-01-04T22:27:59,17.488874440640195,71.95938750575564,2
36,2023-01-05T01:39:16,17.320922767578367,64.18611250941065,3
28,2023-01-05T08:05:27,27.043409746973087,58.02787365289571,4
19,2023-01-06T02:09:57,18.4096354741657,70.76083169405874,3
22,2023-01-06T11:14:09,30.66237019693233,80.15415933426613,2
33,2023-01-06T21:41:13,17.393909453035803,84.26391798180265,1
23,2023-01-06T23:29:46,32.10645239020447,34.20025805570003,1
20,2023-01-08T00:50:54,23.522622706877158,62.65412468863375,1
34,2023-01-08T02:59:52,16.830637063106884,58.212969677892275,3
18,2023-01-08T03:47:31,22.441203861621464,33.66509375138692,3
31,2023-01-08T10:29:09,18.770412446012855,53.47657182783892,1
35,2023-01-08T15:32:37,31.676888611989714,84.13825389078947,1
25,2023-01-08T18:45:43,31.342406060377662,48.06369216008214,4
24,2023-01-09T00:18:37,19.37547118145735,34.31830137085574,4
17,2023-01-09T05:54:40,29.106662306258162,73.62931376729009,2
26,2023-01-09T11:57:19,27.684128271045687,56.16411887719537,3
40,2023-01-09T21:03:42,29.36226652918684,77.31889740058858,3
27,2023-01-10T15:04:21,33.73039432379573,33.662546353177646,3`;

const csv_data_2 = `DateTime,LightIntensity,AirQuality
2023-01-01T04:43:16,249.1074755848718,377.3769103078453
2023-01-01T23:59:34,300.78803877278756,274.28103238128256
2023-01-02T09:35:52,706.3976802776476,418.7241968719451
2023-01-03T07:27:06,794.967146187844,1.696404865103418
2023-01-03T14:40:54,649.1220888427654,350.7580837521201
2023-01-03T22:47:21,738.105430767698,7.145657082364476
2023-01-04T08:09:39,219.10985294027185,0.034581437241831825
2023-01-04T22:27:59,503.32179397928155,481.5188856165437
2023-01-05T01:39:16,610.7251076132349,208.74253778225605
2023-01-05T08:05:27,244.07180112208695,207.56870578229908
2023-01-06T02:09:57,902.7491872785469,454.01992857979576
2023-01-06T11:14:09,379.26782331776246,19.45509200760226
2023-01-06T21:41:13,887.0838848722409,65.26087592103136
2023-01-06T23:29:46,773.6372930778278,162.9719522299552
2023-01-08T00:50:54,868.3969427568402,301.9886939059375
2023-01-08T02:59:52,128.39093031019243,7.364643371912893
2023-01-08T03:47:31,631.2499176875892,442.47275399888156
2023-01-08T10:29:09,739.3149784794527,489.2858754227573
2023-01-08T15:32:37,884.5193731162448,474.7737671379559
2023-01-08T18:45:43,172.65079618522367,24.92849830182586
2023-01-09T00:18:37,846.012493861836,418.86842052225853
2023-01-09T05:54:40,706.0631135350545,223.1823560877633
2023-01-09T11:57:19,635.1192338248982,411.3599616103482
2023-01-09T21:03:42,157.49767820018698,490.12232133273557
2023-01-10T15:04:21,728.724420077812,487.08844114994605`;

const csv_data_3 = `EventID,EventName
1,Event_A
2,Event_B
3,Event_C
4,Event_D`;

// Create Input Data Structure
const input = {
  csv_data_1: csv_data_1,
  csv_data_2: csv_data_2,
  csv_data_3: csv_data_3,
};

async function main(){
  
// Map data to RDF
const result = await flexrml.mapData(input, rmlRule);

console.log("#### RDF DATA: ####\n",result);

}

main()
