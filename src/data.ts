import * as d3 from "d3";

const usStatesCsv = `
rank,place,population
1,New York city,8175133
2,Los Angeles city,3792621
3,Chicago city,2695598
4,Houston city,2099451
5,Philadelphia city,1526006
6,Phoenix city,1445632
7,San Antonio city,1327407
8,San Diego city,1307402
9,Dallas city,1197816
10,San Jose city,945942
11,Jacksonville city,821784
12,Indianapolis city (balance),820445
13,Austin city,790390
14,San Francisco city,805235
15,Columbus city,787033
16,Fort Worth city,741206
17,Charlotte city,731424
18,Detroit city,713777
19,El Paso city,649121
20,Memphis city,646889
21,Boston city,617594
22,Seattle city,608660
23,Denver city,600158
24,Baltimore city,620961
25,Washington city,601723
26,Nashville-Davidson metropolitan government (balance),601222
27,Louisville/Jefferson County metro government (balance),597337
28,Milwaukee city,594833
29,Portland city,583776
30,Oklahoma City city,579999
31,Las Vegas city,583756
32,Albuquerque city,545852
33,Tucson city,520116
34,Fresno city,494665
35,Sacramento city,466488
36,Long Beach city,462257
37,Kansas City city,459787
38,Mesa city,439041
39,Virginia Beach city,437994
40,Atlanta city,420003
41,Colorado Springs city,416427
42,Raleigh city,403892
43,Omaha city,408958
44,Miami city,399457
45,Tulsa city,391906
46,Oakland city,390724
47,Cleveland city,396815
48,Minneapolis city,382578
49,Wichita city,382368
50,Arlington city,365438

`;

type UsState = {
  rank: number;
  place: string;
  population: number;
};

export let usStates: UsState[] = d3
  .csvParseRows(usStatesCsv)
  .slice(2, 22)
  .map((row) => {
    return {
      rank: +row[0],
      place: row[1],
      population: +row[2],
    };
  });
