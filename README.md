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
                    extra: {
                        names: string[];
                        data: {
                            colors: string[];
                        }[];
                    };
                },
                dates: number[];
                children: {
                    name: string;
                }[];
            }`
const parsed: any = parseInterface(interfaceToParse);
console.log(parseResult);

/* output: [
  {
    "obj": {
      "name": "",
      "date": 0,
      "age": 0,
      "color": "red",
      "details": {
        "address": "",
        "extra": {
          "names": [],
          "data": [
            {
              "colors": []
            }
          ]
        }
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
