"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinonChai = require("sinon-chai");
const parseInterface_1 = require("../lib/parseInterface");
const should = chai.should();
chai.use(sinonChai);
describe("Parse interface", () => {
    it("Should parse", () => {
        const interfaceToParse = `
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
            }`;
        const parsed = parseInterface_1.parseInterface(interfaceToParse);
        parsed.should.be.instanceof(Array);
        parsed[0].obj.should.be.instanceof(Object);
    });
    it("Should parse and get string in obj", () => {
        const interfaceToParse = `
        export default interface ITest {
            name: string;
            address: string | number;
            details: {
                address: string;
            }
        }`;
        const parsed = parseInterface_1.parseInterface(interfaceToParse);
        parsed[0].obj.name.should.be.eq("");
        parsed[0].obj.address.should.be.eq("");
        parsed[0].obj.details.address.should.be.eq("");
    });
    it("Should parse and get number in obj", () => {
        const interfaceToParse = `
        export default interface ITest {
            date: number;
            age: number | string;
            details: {
                age: number;
            }
        }`;
        const parsed = parseInterface_1.parseInterface(interfaceToParse);
        parsed[0].obj.date.should.be.eq(0);
        parsed[0].obj.age.should.be.eq(0);
        parsed[0].obj.details.age.should.be.eq(0);
    });
    it("Should parse and get array in obj", () => {
        const interfaceToParse = `
        export default interface ITest {
            names: string[];
            dates: number[];
            children: {
                name: string;
            }[];
        }`;
        const parsed = parseInterface_1.parseInterface(interfaceToParse);
        parsed[0].obj.names.should.be.instanceof(Array);
        parsed[0].obj.dates.should.be.instanceof(Array);
        parsed[0].obj.children.should.be.instanceof(Array);
        parsed[0].obj.children[0].name.should.be.eq("");
    });
    it("Should parse and get array and object in object in obj", () => {
        const interfaceToParse = `
         export default interface ITest {
            details: {
                data: {
                    name: string;
                    age: number;
                };
                address: string | number;
                extra: {
                    names: string[];
                    data: {
                       colors: string[];
                    }[];
                };
            };
        }`;
        const parsed = parseInterface_1.parseInterface(interfaceToParse);
        parsed[0].obj.details.data.name.should.be.eq("");
        parsed[0].obj.details.address.should.be.eq("");
        parsed[0].obj.details.extra.data[0].colors.should.be.instanceof(Array);
    });
    it("Should parse 2 interface and insert the obj from interface to the second interface", () => {
        const interfaceToParse = `
		export default interface IChild {
         	name: string;
         	age: number[];
        }

         export default interface ITest {
         	object: IChild;
         	objectInArray: IChild[];
        }`;
        const parsed = parseInterface_1.parseInterface(interfaceToParse);
        parsed[0].obj.name.should.be.eq("");
        parsed[0].obj.age.should.be.instanceof(Array);
        parsed[0].obj.age[0].should.be.eq(0);
        parsed[1].obj.object.name.should.be.eq("");
        parsed[1].obj.object.age.should.be.instanceof(Array);
        parsed[1].obj.object.age[0].should.be.eq(0);
        parsed[1].obj.objectInArray.should.be.instanceof(Array);
        parsed[1].obj.objectInArray[0].name.should.be.eq("");
        parsed[1].obj.objectInArray[0].age.should.be.instanceof(Array);
        parsed[1].obj.objectInArray[0].age[0].should.be.eq(0);
    });
});
//# sourceMappingURL=unitSpec.js.map