# parse-interface
 [Visit our demo site](https://parse-interface.herokuapp.com/) 

```javascript
import {parseInterface} from "parse-interface";

const interfaceToParse: string = `
            export default interface IOption {
				name: string;
				isActive: boolean;
			}
		
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
                options: IOption[];
            }`
const parseResult: any = parseInterface(interfaceToParse);
console.log(parseResult);

/* output: [
  {
    "obj": {
      "name": "",
      "isActive": false
    },
    "name": "IOption",
    "unknown": []
  },
  {
    "obj": {
      "name": "",
      "date": 0,
      "age": 0,
      "color": "red",
      "details": {
        "address": "",
        "extra": {
          "names": [
            ""
          ],
          "data": [
            {
              "colors": [
                ""
              ]
            }
          ]
        }
      },
      "dates": [
        0
      ],
      "children": [
        {
          "name": ""
        }
      ],
      "options": [
        {
          "name": "",
          "isActive": false
        }
      ]
    },
    "name": "ITest",
    "unknown": []
  }
] */
```
