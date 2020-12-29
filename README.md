# parse-interface

```javascript
import {parseInterface} from "parse-interface";

const interfaceToParse: string = `
export default interface ITest {
    name: string;
    date: number;
    age: number | string;
    color: "red" | "blue",
    details: {
        address: string | number;
    },
     dates: number[];
     children: {
        name: string;
     }[];
}`

const parseResult = parseInterface(interfaceToParse);
console.log(parseResult);

/* output: [
  {
    "obj": {
      "name": "",
      "date": 0,
      "age": 0,
      "color": "red",
      "details": {
        "address": ""
      },
      "dates": [],
      "children": [
        {
          "name": ""
        }
      ]
    },
    "name": "ITest",
    "unknown": []
  }
] */
```
