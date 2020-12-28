import chai = require('chai');
import sinonChai = require("sinon-chai");
import {parseInterface} from "../lib/parseInterface";

let should = chai.should()
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
        }`

        const parsed = parseInterface(interfaceToParse);
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
        }`

        const parsed = parseInterface(interfaceToParse);
        parsed[0].obj.date.should.be.eq(0);
        parsed[0].obj.age.should.be.eq(0);
        parsed[0].obj.details.age.should.be.eq(0);
    });

});
