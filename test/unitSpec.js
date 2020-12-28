"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinonChai = require("sinon-chai");
const parseInterface_1 = require("../lib/parseInterface");
let should = chai.should();
chai.use(sinonChai);
describe('Parse interface', () => {
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
});
//# sourceMappingURL=unitSpec.js.map